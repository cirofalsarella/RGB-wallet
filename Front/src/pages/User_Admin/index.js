import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

import api from '../../services/api';
import Menu from '../../Componentes/Menu.js'

import { FiCornerDownLeft } from 'react-icons/fi'
import './styles.css';


export default function User_Admin() {
    
    const id = new URLSearchParams(useLocation().search).get("id")
    
    const [user, setUser] = useState ({});

    const fetchData = async () => {
        const response = await api.get('/Users/' + id);
        setUser(response.data);

    }
    
    useEffect (() => {
        fetchData();
    }, []);


    return (
        <div className="main-container" >                   
            <Menu mssg="Perfil do Usuário" rota="User_Admin" id={ id } />

            <div className="main-content">
                
                <div className="logout-box">
                    <Link to="../Admin">
                        <button className="yellow-btn"><FiCornerDownLeft/></button>
                    </Link>
                </div>

                <div className="page-name">{user.user_name}</div>

                <div className="tabela">
                    <row>
                        <div className="label">Nome</div>
                        <div className="item">{user.name}</div>
                    </row>
                    <row>
                        <div className="label">Saldo</div>
                        <div className="item">R$ { (user.sum + 0.0001).toFixed(2) }</div>
                    </row>
                    <row>
                        <div className="label">Vendeu Projeto</div>
                        <div className="item">{user.sold ? "sim" : "não"}</div>
                    </row>
                    <row>
                        <div className="label">Semanas com 10 horas</div>
                        <div className="item">{user.weeks_10h}</div>
                    </row>
                    <row>
                        <div className="label">Trabalhado em projeto</div>
                        <div className="item">{user.working ? "sim" : "não"}</div>
                    </row>
                </div>
            </div>
        </div>
    )
}