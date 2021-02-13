import React, { useState, useEffect } from 'react';
import { Link }  from 'react-router-dom';
import api from '../../services/api';

import Menu from '../../Componentes/Menu.js';
import { FiCornerDownLeft } from 'react-icons/fi';

import './styles.css';
import '../../global.css';

export default function User_Create() {

    const [user, setUser] = useState ({});

    const [user_name, setUserName] = useState("");
    const [weeks_10h, setWeeks] = useState("");
    const [working, setWorking] = useState(Boolean);
    const [name, setName] = useState("");
    const [sold, setSold] = useState(Boolean);
    const [sum, setSum] = useState("");


    const fetchData = async () => {
        const response = await api.get('/Users/' + 'jun');
        setUser(response.data);
        setUserName(response.data.user_name);
        setWorking(response.data.working);
        setWeeks(response.data.weeks_10h);
        setName(response.data.name);
        setSold(response.data.sold);
        setSum(response.data.sum);
    }
    useEffect (() => {
        fetchData();
    }, []);

    let id;
    let novo = true;
    if (user){
        novo = false;
        id = user.user_name;
    }

    const handleCreate = (e) => {
        let User = {
            user_name: e.target.username.value,
            name: e.target.name.value,
            sold: e.target.sold.checked, 
            weeks_10h: e.target.weeks.value,
            working: e.target.working.value
        }

        /*
        try {
            if (novo) {
                await api.post("Users", User);
                alert ('Usuario criado com sucesso');
            } else {
                await api.put("Users/" + id, User);
                alert ('Usuario editado com sucesso');
            }

        } catch(err) {
            alert('Erro ao criar usuario');
        }
        */

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
                            <input id="username" value={user_name} onChange={ e => setUserName(e.target.value) } />
                        </row>
                        <row>
                            <div className="table-name">Nome</div>
                            <input id="name" value={name} onChange={ e => setName(e.target.value) } />
                        </row>
                        <row>
                            <div className="table-name">Vendeu Projeto</div>
                            <input id="sold" checked={sold} onChange={ e => setSold(e.target.value)} type="checkbox" />
                        </row>
                        <row>
                            <div className="table-name">Semanas com 10 horas</div>
                            <input id="weeks" value={weeks_10h} onChange={ e => setWeeks(e.target.value) } />
                        </row>
                        <row>
                            <div className="table-name">Trabalhando em um Projeto</div>
                            <input id="working" checked={working} onChange={ e => setWorking(e.target.value) } type="checkbox" />
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