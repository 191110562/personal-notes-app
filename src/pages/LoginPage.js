import React from 'react';
import { Link } from 'react-router-dom';
import useInput from "../hooks/useInput";
import { login } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';
import PropTypes from 'prop-types';

function LoginPage({loginSuccess}) {
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');
    const { locale } = React.useContext(LocaleContext);

    async function onSubmitHandler(event) {
        event.preventDefault();

        const {error, data} = await login({email, password});
        if (!error) {
            loginSuccess(data);
        }
    }

    return (
        <div className='login-page'>
            <h2>{locale === 'id' ? 'Yuk, login untuk menggunakan aplikasi.' : 'Login to use app, please.'}</h2>
            <div className="input-login">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={onEmailChange} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={onPasswordChange} />
                <button onClick = {onSubmitHandler} >Login</button>
            </div>
            <p>{locale === 'id' ? 'Belum punya akun?' : "Don't have an account?"} <Link to="/register">{locale === 'id' ? 'Daftar di sini.' : "Register here"}</Link></p>
        </div>
    );
}

LoginPage.propTypes ={
    loginSuccess:PropTypes.func.isRequired
}

export default LoginPage;