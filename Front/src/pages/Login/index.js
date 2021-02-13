import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../services/AuthService.js'

import RGB_sol from '../../assets/RGB_sol.png'
import ICMC_logo from '../../assets/ICMC_logo.png'

import './styles.css';

export default function Login() {

    const [user_name, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const loginAdmin = () => {
        Auth.loginAdmin(user_name, password);
    }

    function loginUser(){
        console.log(user_name);
    }

    return (
        <div>a
            <div className="main-content">

                <div className="">Carteira RGB</div>
                
                <ul className="login-form">
                    <li>
                        <input 
                            className="text-box"
                            value={ user_name }
                            onChange={ e => setUserName(e.target.value) } />
                        <button onClick={ loginUser } >Login como Usuário</button>
                    </li>
                    <li>
                        <input 
                            className="text-box"
                            value={ password }
                            onChange={ e => setPassword(e.target.value) } />
                        <button onClick={ loginAdmin } >Login como Admin</button>
                    </li>
                </ul>
            
            </div>

            <div className="side-bar"></div>

        </div>
    )
}