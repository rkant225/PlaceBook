import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = (props) =>{
    const {isAuthenticated} = props;
    const {component : Component, ...rest} = props;

    return <Route {...rest} render={(myProps)=>{
        return isAuthenticated ? <Component {...myProps}/> : <Redirect to={{pathname : "/login", state : {from : myProps.location }}}/>
    }}/>
}

const mapStateToProps = (state) => {
    const { LoginModel } = state
    return {
        isAuthenticated: LoginModel.isAuthenticated,
    }
}

export default connect(mapStateToProps,null)(ProtectedRoute);
