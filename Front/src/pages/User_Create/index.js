import React, { useState, useEffect } from 'react';
import { Link, Redirect }  from 'react-router-dom';
import { BrowerRowter, useLocation } from 'react-router-dom';
import api from '../../services/api';

import Menu from '../../Componentes/Menu.js';
import { FiCornerDownLeft } from 'react-icons/fi';

import './styles.css';
import '../../global.css';

export default function User_Create() {

    const id = new URLSearchParams(useLocation().search).get("id")

    const [user, setUser] = useState ({});
    const [user_name, setUserName] = useState("");
    const [weeks_10h, setWeeks] = useState("");
    const [working, setWorking] = useState(Boolean);
    const [name, setName] = useState("");
    const [sold, setSold] = useState(Boolean);
    const [sum, setSum] = useState("");


    const fetchData = async () => {
        const response = await api.get('/Users/' + id);
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

    let novo = true;
    if (user){
        novo = false;
    }

    async function sendUser(User){ return await api.post("Users", User);}
    async function updateUser(User){ return await api.put("Users/" + id, User);}

    const handleCreate = async (e) => {
        let User = {
            user_name: e.target.username.value,
            name: e.target.name.value,
            sold: e.target.sold.checked, 
            weeks_10h: e.target.weeks.value,
            working: e.target.working.checked,
        }

        let msg = '';
        if (novo) {
            try{                
                const response = sendUser(User);
                console.log(response);
                msg = "Usuário criado com sucesso"
                alert(msg);
                
            }catch(err){
                msg = "Ocorreu um erro, tente novamente";
                alert(msg);
            }
        } else {
            try{
                const response = updateUser(User);
                msg = "Usuário editado com sucesso";
                alert(msg);
            }catch(err){
                msg = "Ocorreu um erro, tente novamente";
                alert(msg);
            }
        }
    }

    return (
        <div className="main-container">

            <Menu rota="User_Create" mssg="Editando Usuário"/>
            
            <div className="main-content" >

                <div className="trow-right">
                    <Link to="../Admin">
                        <button className="yellow-btn"><FiCornerDownLeft/></button>
                    </Link> 
                </div>

                <form onSubmit={handleCreate} className="tabela-usuario">

                        <input id="id" value={id} type="hidden" />
                        <input id="novo" value={novo} type="hidden" />
                        
                        <div className="row">
                            <div className="table-name">UserName</div>
                            <input className="text-box" id="username" value={user_name} onChange={ e => setUserName(e.target.value) } />
                        </div>
                        <div className="row">
                            <div className="table-name">Nome</div>
                            <input className="text-box" id="name" value={name} onChange={ e => setName(e.target.value) } />
                        </div>
                        <div className="row">
                            <div className="table-name">Semanas com 10 horas</div>
                            <input className="number-box" id="weeks" value={weeks_10h} onChange={ e => setWeeks(e.target.value) } type="number" />
                        </div>
                        <div className="row">
                            <div className="table-name">Vendeu Projeto</div>
                            <label  className="check-box">
                                <input type="checkbox" id="sold" checked={sold} onChange={ e => setSold(e.target.checked)} />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="row">
                            <div className="table-name">Trabalhando em um Projeto</div>
                            <label  className="check-box">
                                <input type="checkbox" id="working" checked={working} onChange={ e => setWorking(e.target.checked) } />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="trow-center">
                            <button type="submit" className="submit-btn">Salvar Usuário</button>
                        </div>

                    </form>
                
            </div>

        </div>
    )
}