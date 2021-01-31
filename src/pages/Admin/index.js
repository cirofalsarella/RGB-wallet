import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Menu from '../../Componentes/Menu.js'
import './styles.css';

function Tabela(){
    const [UserList, SetUserlist] = useState([]);

    const fetchData = async () => {
        // retorna lista de usuarios
    }

    useEffect(() => {

    }, [UserList]);

    return (
        <div>
            <table className="Tabela-Admin">
                <tr>
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
        </div>
    )
}


export default function Admin() {
    return (
        <div className="Adm-container">
            <Menu rota="Admin" mssg="Bem Vinde de Volta!"/>
            <button>Logout</button>
            <div>Seus Usuarios</div>
            <Tabela />
        </div>
    )
}