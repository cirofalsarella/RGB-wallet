import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../../global.css';
import './styles.css';

import api from '../../services/api'
import Menu from '../../Componentes/Menu.js'

function Tabela(userList){
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
                userList.Map (user => {
                    return (
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.sum}</td>
                            <td>{user.working ? "Sim" : "Não"}</td>
                            <td>{user.weeks_10h}</td>
                            <td><button></button></td>
                        </tr>
                    )
                })

            }
        </table>
    )
}

export default function Admin() {

    async function todos(){
        console.log("entrei no getALL");
        return await api.get('Users/');
    }
    
    let userList = todos();
    console.log(userList);


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
                <Tabela userList={userList} />
            </div>
    
        </div>
    )
}