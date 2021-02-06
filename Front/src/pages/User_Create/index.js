import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import './styles.css';
import '../../global.css'

import api from '../../services/api'
import Menu from '../../Componentes/Menu.js'

import { FiCornerDownLeft } from 'react-icons/fi'

export async function User_Create(props) {

    const user = await api.get('User/:user_name', "jun")

    const [user_name, setUserName] = useState(''); // useState({user.user_name})
    const [name, setName] = useState('');
    const [sold, setSold] = useState('');
    const [working, setWorking] = useState('');
    const [weeks_10h, setWeeks] = useState('');

    async function handleCreate(e){
        e.preventDefault();
        user = {
            user_name, name, sold, working, weeks_10h
        }
        try {
            const response = await api.post("Users", user);
            alert('Usuario criado com sucesso');
        } catch(e) {
            alert('ERRO ao criar usuario');
        }
        

    }


    return (
        <div className="main-container">

            <Menu rota="User_Create" mssg="Editando Usuário"/>
            
            <div className="main-content" >

                <div className="logout-box">
                    <Link to="../Admin">
                        <button className="yellow-btn"><FiCornerDownLeft/></button>
                    </Link> 
                </div>

                <div className="tabela-usuario">
                    <form onSubmit={handleCreate}>
                        <row>
                            <div className="table-name">UserName</div>
                            <input
                              className="text-box"
                              placeholder="Ciro_Falsarella"
                              value={ user_name }
                              onChange={ e => setUserName(e.target.value)} />
                        </row>
                        <row>
                            <div className="table-name">Nome</div>
                            <input className="text-box"
                            placeholder="Ciro Grossi Falsarella"
                            value={ name }
                            onChange={ e => setName(e.target.value) } />
                        </row>
                        <row>
                            <div className="table-name">Vendeu Projeto</div>
                            <input
                              type="checkbox"
                              placeholder="false"
                              value={ sold }
                              onChange={ e => setSold(e.target.value) }
                               />
                        </row>
                        <row>
                            <div className="table-name">Semanas com 10 horas</div>
                            <input 
                              className="text-box" 
                              placeholder="1"
                              value={ weeks_10h }
                              onChange={ e => setWeeks(e.target.value) } />
                        </row>
                        <row>
                            <div className="table-name">Trabalhando em um Projeto</div>
                            <input 
                              type="checkbox"
                              placeholder="true" 
                              value={ working } 
                              onChange={ e => setWorking(e.target.value) }/>
                        </row>
                        <div className="center-box">
                            <button type="submit" className="submit-btn">Salvar Usuário</button>
                        </div>
                    </form>
                </div>
                
              

            </div>

        </div>
    )
}

/*
<row>
<div className="table-name">Saldo</div>
<input
  className="text-box"
  placeholder="0.000"
  value={ Saldo }
  onChange={ e => setSaldo(e.target.value) } />
</row>
*/