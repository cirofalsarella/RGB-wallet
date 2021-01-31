import React from 'react';
import { Link } from 'react-router-dom';

import Menu from '../../Componentes/Menu.js'
import './styles.css';

export default function User_Admin() {
    return (
        <div className="User-Adm-Container" >
            <Menu mssg="Perfil do Usuário" rota="User_Admin"/>

        </div>
    )
}