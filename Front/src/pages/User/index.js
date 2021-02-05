import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../Componentes/Menu.js'
import DesenhoRGB from '../../assets/RGB_desenho.png'


import '../../global.css';
import './styles.css';

export default function User() {
    return (
        <>
            <div className="main-container">
                <Menu rota="User" mssg="Bem Vinde de Volta" />

                <div className="main-content">

                    <div className="logout-box">
                        <Link to="../Login">
                            <button className="yellow-btn">Logout</button>
                        </Link>
                    </div>

                    <div className="tabela">
                        <row>
                            <div className="label">Nome</div>
                            <div className="item">Ciro Grossi Falsarella</div>
                        </row>
                        <row>
                            <div className="label">Saldo</div>
                            <div className="item">R$ 0,00</div>
                        </row>
                    </div>

                    <div className="img-box">
                        <img src={DesenhoRGB} className="img"></img>
                    </div>

                </div>

            </div>
        </>
    )
}