import React from "react";
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
    component: Component,
    exact,
    path
}) => (
    <Route 
        exact={exact} 
        path={path} 
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) :
            (<Redirect to='/auth'/>)
        } />
);

function isAuthenticated() {
    return localStorage.getItem('token');
}

export default ProtectedRoute;