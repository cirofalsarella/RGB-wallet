import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login'
import User  from './pages/User'
import Admin from './pages/Admin'
import User_Admin  from './pages/User_Admin'
import User_Create from './pages/User_Create'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/User/"  component={User} />
                <Route path="/Admin/" component={Admin} />
                <Route path="/User_Admin/"  component={User_Admin} />
                <Route path="/User_Create/" component={User_Create} />
            </Switch>
        </BrowserRouter>
    )
}