import React from 'react';

//React Router
import { Redirect } from 'react-router-dom';

import { isLogin } from './Auth';

function PrivateRoute(props) {
    return (
        <>
            { isLogin() ? props.children : <Redirect to='/login' /> }
        </>
    )
}

export default PrivateRoute;