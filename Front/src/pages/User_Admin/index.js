import React from 'react';
import { Link } from 'react-router-dom';

import Menu from '../../Componentes/Menu.js'
import './styles.css';

import { FiCornerDownLeft } from 'react-icons/fi'

import api from '../../services/api';

export default function User_Admin(props) {
    
    async function Search(test){
        return await api.get('Users/' + test);        
    }

    const user = Search("jun");


    return (
        <div className="main-container" >
            <Menu mssg="Perfil do Usuário" rota="User_Admin"/>


            <div className="main-content">
                
                <div className="logout-box">
                    <Link to="../Admin">
                        <button className="yellow-btn"><FiCornerDownLeft/></button>
                    </Link>
                </div>

                <div className="page-name">Ciro_Falsarella</div>

                <div className="tabela">
                    <row>
                        <div className="label">Nome</div>
                        <div className="item">Ciro Grossi Falsarella</div>
                    </row>
                    <row>
                        <div className="label">Saldo</div>
                        <div className="item">R$ 0,00</div>
                    </row>
                    <row>
                        <div className="label">Vendeu Projeto</div>
                        <div className="item">Não</div>
                    </row>
                    <row>
                        <div className="label">Semanas com 10 horas</div>
                        <div className="item">1</div>
                    </row>
                    <row>
                        <div className="label">Trabalhado em projeto</div>
                        <div className="item">Sim</div>
                    </row>
                </div>
            </div>
        </div>
    )
}