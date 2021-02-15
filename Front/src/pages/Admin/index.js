import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Auth from '../../services/AuthService.js'

import '../../global.css';
import './styles.css';

import api from '../../services/api'
import Menu from '../../Componentes/Menu.js'

function Tabela(){
    const [userList, setUserList] = useState ([]);

    const fetchData = async () => {
        try {
            const response = await api.get('/Users');
            setUserList(response.data);
        } catch (e) {
            alert(e);            
        }
    }
    
    useEffect (() => {
        fetchData();
    }, []);

    return (
        <table className="tabela-usuarios">
            <tr className="titulos">
                <th>Nome</th>
                <th>Saldo</th>
                <th>Em Projeto</th>
                <th>Semanas Cumpridas</th>
                <th></th>
            </tr>

            {
                userList.length > 0 &&
                userList.map(user => {
                    return (
                        <tr>
                            <td>{user.user_name}</td>
                            <td>{user.sum}</td>
                            <td>{user.working ? "Sim" : "Não"}</td>
                            <td>{user.weeks_10h}</td>
                            <td>
                                <Link to={ `../User_Admin/?id=${user.user_name}` }>
                                    <button/>
                                </Link>
                            </td>
                        </tr>
                    )
                })

            }
        </table>
    )
}

export default function Admin() {
    const [loggedOut, setLogOut] = useState(false);    

    const logout = () => {
        Auth.logOut();
        setLogOut(true);
    }

    return (
        <div className="main-container">
            { loggedOut && <Redirect to="/"/>}


            <Menu rota="Admin" mssg="Bem Vinde de Volta!"/>
    
            <div className="main-content">
                <div className="logout-box">
                    <button className="yellow-btn" onClick={ logout } >Logout</button>
                </div>

                <div className="page-name"> Seus Usuarios</div>
                <Tabela />
            </div>
    
        </div>
    )
}