import React from 'react';
import { Link } from 'react-router-dom';

import Menu from '../../Componentes/Menu.js'
import './styles.css';

import { FiCornerDownLeft } from 'react-icons/fi'

export default function User_Create(props) {
    return (
        <div className="main-container">

            <Menu rota="User_Create" mssg="Editando Usuário"/>
            
            <div className="main-content" >

                <div className="logout-box">
                    <button className="yellow-btn"><FiCornerDownLeft/></button>
                </div>

                <div className="page-name">{"aa" + props.nickname}</div>

                <div className="tabela-usuario">
                    <form>
                        <row>
                            <div className="table-name">UserName</div>
                            <input className="text-box" placeholder={props.UserName} />
                        </row>
                        <row>
                            <div className="table-name">Nome</div>
                            <input className="text-box" placeholder={props.Nome} />
                        </row>
                        <row>
                            <div className="table-name">Saldo</div>
                            <input className="text-box" placeholder={props.Saldo} />
                        </row>
                        <row>
                            <div className="table-name">Vendeu Projeto</div>
                            <input className="text-box" placeholder={props.Vendeu} />
                        </row>
                        <row>
                            <div className="table-name">Semanas com 10 horas</div>
                            <input className="text-box" placeholder={props.semanas} />
                        </row>
                        <row>
                            <div className="table-name">Trabalhando em um Projeto</div>
                            <input className="text-box" placeholder={props.projeto} />
                        </row>
                    </form>
                </div>
                
                <div className="center-box">
                    <button type="submit" className="submit-btn">Salvar Usuário</button>
                </div>

            </div>

        </div>
    )
}