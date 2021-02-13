import React from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

import logoImg from '../assets/ICMC_logo.png'

import './style.css'

const nada = async function(){
}

const balancesReset = async function(){
    console.log("reset");
    await api.put('Admin/Zera');
}

const balancesUpdate = async function(){
    console.log("update");
    await api.put('Admin/Saldo');
}

const userDelete = async function (user_name){
    console.log("delete");
    await api.delete('Users/'+ user_name);
}

function Tabela(props){

    const MenuList = ([]);
    if (props.rota == "Admin"){
        MenuList.push (
            {
                acao: nada,
                rota: "../User_Create",
                texto: "Novo Usuário"
            },
            {
                acao: balancesUpdate,
                rota: "../Admin",
                texto: "Adicionar Crédito"
            },
            {
                acao: balancesReset,
                rota: "../Admin",
                texto: "Zerar Saldos"
            },
        );
    } else if (props.rota == "User_Admin" ){
        MenuList.push (
            {
                acao: {},
                rota: "../User_Create",
                texto: "Editar Usuário"
            },
            {
                acao: userDelete,
                rota: "../User",
                texto: "Apagar Usuário"
            },
        );
    } else {
        MenuList.push (
        );

    }

    return(
        <ul className="Lista-Menu">
            {
                MenuList.map (item =>{
                    return (
                        <li>
                            <Link to={item.rota}>
                                <button className="Botao-Menu" onClick={item.acao}>{item.texto}</button>
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}


export default function Menu(props){
    return (
        <div className="Menu-Container" >

            <div className="Cabecalho">
                <div className="Mssg">{props.mssg}</div>
                <div className="Linha"></div>
            </div>

            <Tabela rota={props.rota}/>

            <img src={logoImg} alt="Logo ICMC júnior" className="Img" />
        
        </div>

    )
}
