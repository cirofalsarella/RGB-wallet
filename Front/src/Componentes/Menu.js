import React from 'react';
import { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import api from '../services/api';

import logoImg from '../assets/ICMC_logo.png'

import './style.css'

const userEdit = (setRedirect) => {
    setRedirect(true);
}
const userCreate = (setRedirect) => {
    setRedirect(true);
}
const balancesReset = async function(setRedirect){
    await api.put('Admin/Zera');
    setRedirect(true);
    window.location.reload();
}
const balancesUpdate = async function(setRedirect){
    await api.put('Admin/Saldo');
    setRedirect(true);
    window.location.reload();
}
async function userDelete(setRedirect, user_name){
    await api.delete('Users/'+ user_name);
    setRedirect(true);
}
function Tabela(props){
    
    const [admin, setAdmin] = useState(false)
    const [editar, setEditar] = useState(false)
    const [criar, setCriar] = useState(false)
    let editDest = `../User_Create/?id=${props.id}`

    const MenuList = ([]);
    if (props.rota === "Admin"){
        MenuList.push (
            {
                acao: () => userCreate(setCriar),
                texto: "Novo Usuário"
            },
            {
                acao: () => balancesUpdate(setAdmin),
                texto: "Adicionar Crédito"
            },
            {
                acao: () => balancesReset(setAdmin),
                texto: "Zerar Saldos"
            },
        );
    } else if (props.rota === "User_Admin" ){
        MenuList.push (
            {
                acao: () => userEdit(setEditar, props.id),
                texto: "Editar Usuário"
            },
            {
                acao: () => userDelete(setAdmin, props.id),
                texto: "Apagar Usuário"
            },
        );
    }

    return(
        <ul className="Lista-Menu">
            { admin && <Redirect to="../Admin"/> }
            { editar && <Redirect to={ editDest } /> }
            { criar && <Redirect to="../User_Create/"/> }

            {
                MenuList.map (item =>{
                    return (
                        <li>
                            <button className="Botao-Menu" onClick={item.acao}>{item.texto}</button>
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

            <Tabela rota={props.rota} id={props.id}/>

            <img src={logoImg} alt="Logo ICMC júnior" className="Img" />
        
        </div>

    )
}
