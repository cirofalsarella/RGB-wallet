import React, { useState, useEffect } from 'react';
import { useLocation, Link, Redirect } from 'react-router-dom';
import Auth from '../../services/AuthService.js'

import RGB_sol from '../../assets/RGB_sol.png'
import ICMC_logo from '../../assets/ICMC_logo.png'

import '../../global.css';
import './styles.css';

export default function Login(props) {
    // Flags para caso o login esteja errado
    let notFound = new URLSearchParams(useLocation().search).get("notFound");
    const [notAdmin, setNotAdmin] = useState(false);

    // Flags para redirecionamento de página
    const [usuario, setusuario] = useState(false);
    const [admin, setAdmin] = useState(false);

    // Inputs da página
    const [user_name, setUserName] = useState('');
    const [password, setPassword] = useState('');


    const loginAdmin = async (e) => {
        e.preventDefault();  

        Auth.loginAdmin(e.target.user_name.value, e.target.password.value).then((res) => {
            if (res){
                setAdmin(res);
            } else {
                setNotAdmin(true);
            }
        })
    }

    return (
        <>
            { usuario && <Redirect to={`../User/?id=${user_name}`} /> }
            { admin && <Redirect to="/Admin" /> }

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
                        <p><div className="text">
                            {notFound && <span>Usuário não encontrado</span> ||
                             notAdmin && <span>Username ou Senha incorretos</span>}
                        </div></p>

                        <div className="data-type">
                            <div className="data-place">
                                <span className="row-name">Username</span>
                                <input className="text-box" id="user_name" value={ user_name } onChange={ e => setUserName(e.target.value) } />
                            </div>

                            <button onClick={() => setusuario(true)} className="yellow-btn">Login como Usuário</button>
                        </div>

                        <div className="data-type">
                            <div className="data-place">
                                <span className="row-name">Senha</span>
                                <input className="text-box" id="password" value={ password } onChange={ e => setPassword(e.target.value) } type="password" />
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