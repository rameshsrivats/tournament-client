import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'

import { AuthContext } from '../contexts'

const UnauthRoute = ({
    component: Component,
    ...rest
}) => {
    
    const { auth } = useContext(AuthContext)

    return (
        <Route {...rest} component={(props) => (
            !auth ? (
                <Component {...props} />            
            ) : (
                <Redirect to="/me" />
            )
        )} />
    )
}

export default UnauthRoute