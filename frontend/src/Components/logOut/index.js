import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as Actions from '../../Redux/Actions/loginActions';

const LogOut = (props)=>{
    const {logOut} = props;

    useEffect(()=>{
        logOut()
    })
    return(
        <React.Fragment>
            <Redirect to="/login"/>
        </React.Fragment>
    );
}

const mapStateToProps =(state)=>{
    const {LoginModel} = state;
    return{
        isAuthenticated : LoginModel.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch,
        logOut : ()=> dispatch(Actions.logOut()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);