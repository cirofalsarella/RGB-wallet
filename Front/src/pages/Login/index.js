import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Auth from '../../services/AuthService.js'

import RGB_sol from '../../assets/RGB_sol.png'
import ICMC_logo from '../../assets/ICMC_logo.png'

import './styles.css';
import '../../global.css';

export default function Login() {
    const [usuario, setusuario] = useState(false);
    const [admin, setAdmin] = useState(false);

    const [user_name, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = () => {
        setusuario(true);
    }

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
        <>
            {usuario && <Redirect to={`../User/?id=${user_name}`} />}
            {admin && <Redirect to="/Admin" />}

            <div className="main-container">
                <div className="main-content">

                    <div className="cabecalho">
                        <div className="page-name">Carteira 
                            <span className="red"> R</span>
                            <span className="green">G</span>
                            <span className="blue">B</span>
                        </div>
                    </div>
                    
                    <form onSubmit={loginAdmin} className="formulario">
                        <div className="data-type">
                            <div className="data-place">
                                <span className="row-name">Username</span>
                                <input className="text-box" id="user_name" value={ user_name } onChange={ e => setUserName(e.target.value) } />
                            </div>

                            <button onClick={loginUser} className="yellow-btn">Login como Usuário</button>
                        </div>

                        <div className="data-type">
                            <div className="data-place">
                                <span className="row-name">Senha</span>
                                <input className="text-box" id="password" value={ password } onChange={ e => setPassword(e.target.value) } />
                            </div>

                            <button type="submit" className="yellow-btn">Login como Admin</button>
                        </div>
                    </form>
                

                </div>

                <div className="side-bar">
                    <img src={ICMC_logo} alt="ICMC júnior" className="img-logo" />
                    <img src={RGB_sol} alt="ICMC júnior" className="img-sol"/>
                </div>
            </div>
        </>
    )
}