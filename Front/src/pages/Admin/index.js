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
        <>
            { userList.length > 0 &&
                <table className="tabela-usuarios">
                    <tr className="titulos">
                        <th>Nome</th>
                        <th>Saldo</th>
                        <th>Em Projeto</th>
                        <th>Semanas Cumpridas</th>
                    </tr>
                        { userList.map(user => {
                            return (
                                <tr>
                                    <td>{user.user_name}</td>
                                    <td>{user.sum}</td>
                                    <td>{user.working ? "Sim" : "Não"}</td>
                                    <td>{user.weeks_10h}</td>
                                    <Link to={ `../User_Admin/?id=${user.user_name}` }>
                                        <button>Visualizar</button>
                                    </Link>
                                </tr>
                            )}
                        )}
                </table>
            }

            { userList.length == 0 &&
                <div className="default-message">
                    Ainda não existem usuários em seu time,<br/><p/>
                    <b>Adicione eles!</b>
                </div>
            }
        </>
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
                <div className="trow-right">
                    <button className="yellow-btn" onClick={ logout } >Logout</button>
                </div>

                <div className="page-name"> Seus Usuarios</div>
                <Tabela />
            </div>
    
        </div>
    )
}