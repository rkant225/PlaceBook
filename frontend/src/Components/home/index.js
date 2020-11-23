import { Grid, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import UsersList from './usersList';
import * as Actions from '../../Redux/Actions/usersActions';

const Home = (props)=>{
    const {getAllUsers, users} = props;
    const {history} = props;

    useEffect(()=>{
        getAllUsers();
    }, []);

    return(
        <React.Fragment>
            <UsersList users={users} history={history}/>
        </React.Fragment>
    );
}

const mapStateToProps =(state)=>{
    const {UsersModel} = state;
    return{
        users : UsersModel.users,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch,
        getAllUsers : ()=> dispatch(Actions.getAllUsers()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);