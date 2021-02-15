import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Auth from '../../services/AuthService.js'

import RGB_sol from '../../assets/RGB_sol.png'
import ICMC_logo from '../../assets/ICMC_logo.png'

import './styles.css';

export default function Login() {

    const [admin, setAdmin] = useState (false);
    const [user_name, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const loginAdmin = async (e) => {
        e.preventDefault();  
        Auth.loginAdmin(e.target.user_name.value, e.target.password.value).then((res) => {
            if (res){
                setAdmin(res);
            } else {
                alert("Username ou Senha incorretos")
            }
        })
    }

    return (
        <div>
            <div className="main-content">

                <div className="">Carteira RGB</div>

                <ul className="login-form">
                    <form onSubmit={loginAdmin}>
                        <li>
                            <input id="user_name" value={ user_name } onChange={ e => setUserName(e.target.value) } />
                            <Link to={`../User/?id=${user_name}`}>
                                <button>Login como Usuário</button>
                            </Link>
                        </li>
                        <li>
                            <input id="password" value={ password } onChange={ e => setPassword(e.target.value) } />
                            <button type="submit" >Login como Admin</button>
                        </li>
                        {admin && <Redirect to="/Admin" />}
                    </form>
                </ul>
            
            </div>

            <div className="side-bar"></div>

        </div>
    )
}