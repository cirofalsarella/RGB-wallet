import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../assets/ICMC_logo.png'

import './style.css'



function Tabela(props){
    async function balancesReset(){
        await api.put('Admin/zerar');
    }

    async function balancesUpdate(){
        await api.put('Admin/Saldo');
    }

    async function userDelete(user_name){
        await api.delete('Users/'+ user_name);
    }

    const MenuList = ([]);
    if (props.rota == "Admin"){
        MenuList.push (
            {
                acao:"",
                rota:"../User_Create",
                texto:"Novo Usuário"
            },
            {
                acao:balancesUpdate(),
                rota:"./",
                texto:"Adicionar Crédito"
            },
            {
                acao:balancesReset(),
                rota:"./",
                texto:"Zerar Saldos"
            },
        );
    } else if (props.rota == "User_Admin" ){
        MenuList.push (
            /*
            {
                acao: "",
                rota: "./",
                texto: "Zerar Saldo"
            },
            */
            {
                acao: "",
                rota: "../User_Create",
                texto: "Editar Usuário"
            },
            {
                acao: userDelete(),
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
                MenuList.map(item =>{
                    return (
                        <li>
                            <Link to={item.rota}>
                                <button className="Botao-Menu" onclick={item.acao}>{item.texto}</button>
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
