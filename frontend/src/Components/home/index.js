import { Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { connect } from 'react-redux';
import UsersList from './usersList';
import * as Actions from '../../Redux/Actions/usersActions';
import ToolTip from '../SharedComponents/toolTip';


const Home = (props)=>{
    const {getAllUsers, users} = props;
    const {history} = props;

    useEffect(()=>{
        getAllUsers();
    }, []);

    return(
        <React.Fragment>
            {users && users.length > 0 &&
                <div style={{margin : 'auto', width : 'fit-content'}}>
                    <Typography align="center" variant="h6" style={{display : 'inline-block'}}>This is the list of all the users who joined us.</Typography>
                    <ToolTip disableHover={true} message="You can click on any user to view the places added by them. Alternatively you can click on 'All Places' in top navigation to view all the places by all users."/>
                </div>
            }

            {users && users.length == 0 && 
                <div style={{width : '100%', textAlign : 'center', marginTop : '5rem'}}>
                    <Typography style={{fontSize : '1.7rem'}}>
                        No Users found.
                    </Typography>
                    <div>
                        <SentimentVeryDissatisfiedIcon fontSize="large"/>
                    </div>
                </div>
            }
            
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