import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Auth from '../../services/AuthService.js'

import api from '../../services/api'
import Menu from '../../Componentes/Menu.js'

import '../../global.css';
import './styles.css';

function Tabela(){
    // Lista com os usuários
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

    const [redirect, setRedirect] = useState('');

    return (
        <>
            { redirect && <Redirect to={ `../User_Admin/?id=${redirect}`}/> }
            { userList.length > 0 &&
                <table className="tabela-usuarios">
                    <tr className="titulos">
                        <td>Nome</td>
                        <td>Saldo</td>
                        <td>Em Projeto</td>
                        <td>Semanas Cumpridas</td>
                    </tr>
                    { userList.map(user => {
                        return (
                            <tr onClick={() => setRedirect(user.user_name)} >
                                <td>{user.user_name}</td>
                                <td>{user.sum}</td>
                                <td>{user.working ? "Sim" : "Não"}</td>
                                <td>{user.weeks_10h}</td>
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
    // Redirect para LogOut
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
                <div className="row">
                    <div className="page-name">Usuários</div>
                    <button className="yellow-btn" onClick={ logout } >Logout</button>
                </div>

                <Tabela />
            </div>
    
        </div>
    )
}