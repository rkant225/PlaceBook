import React from 'react';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { Button, Typography } from '@material-ui/core';
import { connect } from 'react-redux';

const NoPlacesFound = (props)=>{

    const {history} = props;
    const {loggedInUserDetails, currentlySelectedUser} = props;
    return(
        <div style={{width : '100%', textAlign : 'center', marginTop : '5rem'}}>
                    
            <Typography style={{fontSize : '1.7rem'}}>
                No places found.
            </Typography>

            <div>
                <SentimentVeryDissatisfiedIcon fontSize="large"/>
            </div>

            {loggedInUserDetails && currentlySelectedUser && loggedInUserDetails.id == currentlySelectedUser.id &&
                <Button onClick={()=>history.push('/add-place')} style={{marginTop : '5rem'}} variant="contained" color="primary">Add new place</Button>
            }

        </div>
    );
}

const mapStateToProps =(state)=>{
    const {LoginModel, UsersModel} = state;
    return{
        loggedInUserDetails : LoginModel.loggedInUserDetails,
        currentlySelectedUser : UsersModel.currentlySelectedUser,

    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoPlacesFound);