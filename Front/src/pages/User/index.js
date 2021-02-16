import React, { useState, useEffect } from 'react';
import { BrowerRowter, useLocation, Link } from 'react-router-dom';
import api from '../../services/api';

import Menu from '../../Componentes/Menu.js';

import DesenhoRGB from '../../assets/RGB_desenho.png';

import '../../global.css';
import './styles.css';


export default function User() {

    const user_name = new URLSearchParams(useLocation().search).get("id")
    const [user, setUser] = useState ([]);
    
    const fetchData = async () => {
        try {
            const response = await api.get('/Users/' + user_name);
            setUser(response.data);
        } catch (e) {
            alert(e);            
        }
    }

    useEffect (() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="main-container">
                <Menu rota="User" mssg="Bem Vinde de Volta" />

                <div className="main-content">

                    <div className="trow-right">
                        <Link to="../Login">
                            <button className="yellow-btn">Logout</button>
                        </Link>
                    </div>

                    <div className="tabela">
                        <div className="row">
                            <div className="label">Nome</div>
                            <div className="item">{ user.user_name }</div> 
                        </div>
                        <div className="row">
                            <div className="label">Saldo</div>
                            <div className="item">R$ { (user.sum + 0.0001).toFixed(2) } </div>
                        </div>
                    </div>

                    <div className="img-box">
                        <img src={DesenhoRGB} className="img"></img>
                    </div>

                </div>

            </div>
        </>
    )
}