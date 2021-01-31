import React from 'react';
import { Link } from 'react-router-dom';

import Menu from '../../Componentes/Menu.js'
import './styles.css';

import { FiCornerDownLeft } from 'react-icons/fi'

export default function User_Create(props) {
    return (
        <div className="Create-container">

            <Menu rota="User_Create" mssg="Editando Usuário"/>
            
            <button><FiCornerDownLeft/></button>

            <div className="content">
                <form>
                    <row>
                        <div>UserName</div>
                        <input placeholder={props.UserName} />
                    </row>
                    <row>
                        <div>Nome</div>
                        <input placeholder={props.Nome} />
                    </row>
                    <row>
                        <div>Saldo</div>
                        <input placeholder={props.Saldo} />
                    </row>
                    <row>
                        <div>Vendeu Projeto</div>
                        <input placeholder={props.Vendeu} />
                    </row>
                    <row>
                        <div>Semanas com 10 horas</div>
                        <input placeholder={props.semanas} />
                    </row>
                    <row>
                        <div>Trabalhando em um Projeto</div>
                        <input placeholder={props.projeto} />
                    </row>
                </form>
            </div>

            <button type="submit">Salvar Usuário</button>

        </div>
    )
}