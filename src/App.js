import React from 'react';
import { Link, Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation';  
import ToggleLocale from './components/ToggleLocale';
import ToggleTheme from './components/ToggleTheme';
import { LocaleProvider } from './contexts/LocaleContext';
import { ThemeProvider } from './contexts/ThemeContext';
import AddPage from './pages/AddPage';
import ArchivePage from './pages/ArchivePage';
import DetailPage from './pages/DetailPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import { getUserLogged, putAccessToken } from './utils/network-data';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      localeContext: {
        locale: localStorage.getItem('locale') || 'id',
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale = prevState.localeContext.locale === 'id' ? 'en' : 'id'
            localStorage.setItem('locale', newLocale)
            return { 
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale,
              }
            }
          });
        },
      },
      themeContext: {
        theme: localStorage.getItem('theme') || 'light',
        toggleTheme: () => {
          this.setState((prevState) => {
            const newTheme = prevState.themeContext.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            return {
              themeContext: {
                ...prevState.themeContext,
                theme: newTheme
              }
            }
          })
        }
      }
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount() {
    const { data } = await getUserLogged();

    this.setState(() => {
      return{
        authedUser: data,
        initializing: false
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.themeContext.theme) {
      document.documentElement.setAttribute('data-theme', this.state.themeContext.theme);
    }
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null
      }
    });

    putAccessToken('');
  }

  render() {
    if (this.state.initializing){
      return null;
    }

    if (this.state.authedUser === null) {
      return(
        <ThemeProvider value={this.state.themeContext}>
          <LocaleProvider value={this.state.localeContext}>
            <div className="app-container">
              <header>
                <h1>
                  <Link to="/">{this.state.localeContext.locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link>
                </h1>
                <ToggleLocale />
                <ToggleTheme />
              </header>
              <main>
                <Routes>
                  <Route path='/*' element={<LoginPage loginSuccess={this.onLoginSuccess}/>}/>
                  <Route path='/register' element={<RegisterPage />}/>
                  <Route path='*' element={<NotFoundPage/>}/>
                </Routes>
              </main>
            </div>
          </LocaleProvider>

        </ThemeProvider>
      )
    }
    
    return (
      <ThemeProvider value={this.state.themeContext}>
        <LocaleProvider value={this.state.localeContext}>
          <div className="app-container">
            <header>
              <h1>
                <Link to="/">{this.state.localeContext.locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link>
              </h1>
              <ToggleLocale />
              <ToggleTheme />
              <Navigation logout={this.onLogout} name={this.state.authedUser.name}/>
            </header>
            <main>
              <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/archives' element={<ArchivePage/>}/>
                <Route path='/notes/:id' element={<DetailPage/>}/>
                <Route path='/notes/new' element={<AddPage/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
              </Routes>
            </main>
          </div>
        </LocaleProvider>
      </ThemeProvider>
    );
  }
}

export default App;
