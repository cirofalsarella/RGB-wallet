import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../../global.css';
import './styles.css';

import Menu from '../../Componentes/Menu.js'

function Tabela(){
    const [UserList, SetUserlist] = useState([]);

    const fetchData = async () => {
        // retorna lista de usuarios
    }

    useEffect(() => {

    }, [UserList]);

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
                UserList.length > 0 &&
                UserList.Map (user => {
                    return (
                        <tr>
                            <td>{user.nome}</td>
                            <td>{user.saldo}</td>
                            <td>{user.projeto ? "Sim" : "Não"}</td>
                            <td>{user.Semanas}</td>
                            <td><button></button></td>
                        </tr>
                    )
                })

            }
        </table>
    )
}

export default function Admin() {
    return (
        <div className="main-container">
    
            <Menu rota="Admin" mssg="Bem Vinde de Volta!"/>
    
            <div className="main-content">
                <div className="logout-box">
                    <Link to="../Login">
                        <button className="yellow-btn">Logout</button>
                    </Link>
                </div>
                <div className="page-name"> Seus Usuarios</div>
                <Tabela />
            </div>
    
        </div>
    )
}