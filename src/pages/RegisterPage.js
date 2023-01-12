import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from "../hooks/useInput";
import { register } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';

function RegisterPage() {
    const [name, onNameChange] = useInput('');
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');
    const navigate = useNavigate();
    const { locale } = React.useContext(LocaleContext);

    async function onSubmitHandler(event) {
        event.preventDefault();

        const {error} = await register({name, email, password});
        if (!error) {
            navigate('/');
        }
    }

    return (
        <div className= 'register-page'>
            <h2>{locale === 'id' ? 'Isi form untuk mendaftar akun.': 'Fill the form to register account.'}</h2>
            <div className="input-register">
                <label htmlFor="name">Name</label>
                <input type="name" id="name" value={name} onChange={onNameChange} />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={onEmailChange} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={onPasswordChange} />
                <button onClick = {onSubmitHandler} >Register</button>
            </div>
            <p>{locale === 'id' ? 'Belum punya akun?' : 'Already have an account?'} <Link to="/">{locale === 'id' ? 'Login di sini' : 'Login here'}</Link></p>
        </div>
    );
}

export default RegisterPage;