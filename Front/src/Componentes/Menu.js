import React, { useState } from 'react';
import logoImg from '../assets/ICMC_logo.png'
import './style.css'



function Tabela(props){
    const MenuList = ([])
    if (props.rota == "Admin"){
        MenuList.push (
            {
                acao:"",
                texto:"Novo Usuário"
            },
            {
                acao:"",
                texto:"Adicionar Crédito"
            },
            {
                acao:"",
                texto:"Zerar Saldos"
            },
        );
    } else if (props.rota == "User_Admin" ){
        MenuList.push (
            {
                acao:"",
                texto:"Zerar Saldo"
            },
            {
                acao:"",
                texto:"Editar Usuário"
            },
            {
                acao:"",
                texto:"Apagar Usuário"
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
                            <button className="Botao-Menu" onclick={item.acao}>{item.texto}</button>
                        </li>
                    )
                })
            }
        </ul>
    )
}

function Menu(props){


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

export default Menu;