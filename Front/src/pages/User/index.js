import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../Componentes/Menu.js'

import './styles.css';

export default function User() {
    return (
        <>
            <Menu rota="User" mssg="Bem Vinde de Volta" />
        </>
    )
}