import React, { useState, useEffect } from 'react';
import { Link }  from 'react-router-dom';
import api from '../../services/api';

import Menu from '../../Componentes/Menu.js';

import { FiCornerDownLeft } from 'react-icons/fi';

import './styles.css';
import '../../global.css';


export default function User_Create(props) {
    const [user, setUser] = useState ();

    const fetchData = async () => {
        const response = await api.get('/Users/' + 'jun');
        setUser(response.data);
    }

    useEffect (() => {
        fetchData();
    }, []);

    //let old_user_name = user.user_name;

    let novo = false;
    if (user === undefined) novo = true;

    console.log(user);
    const [user_name, setUserName] = useState(user.user_name);
    const [name, setName] = useState(user.name);
    const [sold, setSold] = useState(user.sold);
    const [working, setWorking] = useState(user.working);
    const [weeks_10h, setWeeks] = useState(user.weeks_10h);

    async function handleCreate(e){
        e.preventDefault();
        const user = {
            user_name, name, sold, working, weeks_10h
        }
        try {
            if (novo) {
                await api.post("Users", user);
                alert ('Usuario criado com sucesso');
            } else {
                // Trocar user_name por um identificador que não seja alterado
                await api.put("Users/" + user.user_name, user);
                alert ('Usuario editado com sucesso');
            }

        } catch(err) {
            alert('Erro ao criar usuario');
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
                              value={ user_name }
                              onChange={ e => setUserName(e.target.value) } />
                        </row>
                        <row>
                            <div className="table-name">Nome</div>
                            <input className="text-box"                            
                            value={ name }
                            onChange={ e => setName(e.target.value) } />
                        </row>
                        <row>
                            <div className="table-name">Vendeu Projeto</div>
                            <input
                              type="checkbox"
                              value={ sold }
                              onChange={ e => setSold(e.target.value) }
                               />
                        </row>
                        <row>
                            <div className="table-name">Semanas com 10 horas</div>
                            <input 
                              className="text-box" 
                              value={ weeks_10h }
                              onChange={ e => setWeeks(e.target.value) } />
                        </row>
                        <row>
                            <div className="table-name">Trabalhando em um Projeto</div>
                            <input 
                              type="checkbox"
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