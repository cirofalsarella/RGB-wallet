import React from 'react';
import Auth from './services/AuthService'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from './pages/Login'
import User  from './pages/User'
import Admin from './pages/Admin'
import User_Admin  from './pages/User_Admin'
import User_Create from './pages/User_Create'


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            const username = Auth.isLogged();
            console.log(username);  

            if (!username){                
                return (
                    <Redirect to="/" component={Login} />
                )
            }

            return <Component />
        }}
    />
  );


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoute exact path="/Admin/" component={Admin} />
                <PrivateRoute exact path="/User_Admin/"  component={User_Admin} />
                <PrivateRoute exact path="/User_Create/" component={User_Create} />
                <Route exact path="/User/" component={User} />
                <Route path="/" component={Login} />
            </Switch>
        </BrowserRouter>
    )
}