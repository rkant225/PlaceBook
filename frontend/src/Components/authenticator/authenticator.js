import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../Redux/Actions/loginActions';
import * as SessionTimeOutActions from '../../Redux/Actions/sessionTimeOutActions';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

// --------NOTE--------
// This component will be reloaded Whenever 
// 1. Any page is reloaded
// 2. user is logged In
// 3. user is logged Out
// --------NOTE--------

let timer;

const Authenticator = (props)=>{

    const CHECK_VALIDITY_OF_ACCESSTOKEN_IN_TIME_INTERVEL_OF_THIS_MUCH_MILISECONDS = 1000 * 60 ; // In miloseconds
    const REMIND_IF_DIFFERENCE_IN_SECONDS_IS_LESS_THAN = 70; // In Seconds

    // ------This is for Quick testing-----
    // const CHECK_VALIDITY_OF_ACCESSTOKEN_IN_TIME_INTERVEL_OF_THIS_MUCH_MILISECONDS = 1000 * 2 ; // In miloseconds
    // const REMIND_IF_DIFFERENCE_IN_SECONDS_IS_LESS_THAN = 25; // In Seconds
    // ------This is for Quick testing-----
    
    const {logOut, openSessionTimeOutModalOpen, closeSessionTimeOutModalOpen} = props; // Comming from Redux Actions
    const {isAuthenticated} = props; // Comming from Redux Store
    const history = useHistory(); // History to navigate user, If accesstoken is expired

    const access_token = sessionStorage.getItem('access_token');




    // This method will check the expiry time of access token after a time interval and logs out the user if it is expired.
    const LogOutIfTokenExpired = () =>{

        const access_token = sessionStorage.getItem('access_token');

        if(access_token){
            console.log('Checking the validity of Access token.....');

            const decodedToken = jwt_decode(access_token); // Decode the access token.
            const {exp} = decodedToken; // Get the expiry time.

            const currentDifference = exp - Math.round(new Date().getTime() / 1000); // In Seconds
            if(currentDifference < REMIND_IF_DIFFERENCE_IN_SECONDS_IS_LESS_THAN){
                openSessionTimeOutModalOpen(); // Open Modal to ask user to retain the access_token
            }

            const isAccessTokenValid = (new Date().getTime() / 1000) < exp; // Verify if it is not expired
    
            if(!isAccessTokenValid){
                // clearInterval(accessTokenValidationTimer); // clear the Interval which is checking the expiry time of access token.
                closeSessionTimeOutModalOpen(); // Close the modal automaticly
                logOut(); // LogOut user
                history.push('/login?reason=sessionExpired')
            }
        }
    }


    // This will run on every reload of this component. // 1. Any page is reloaded // 2. user is logged In // 3. user is logged Out
    useEffect(()=>{
        if(access_token){ // Chech if token is present in sessionStorage
            console.log('TIMET START...');
            timer = setInterval(LogOutIfTokenExpired, CHECK_VALIDITY_OF_ACCESSTOKEN_IN_TIME_INTERVEL_OF_THIS_MUCH_MILISECONDS);
        }
    });

    useEffect(()=>{
        if(!isAuthenticated){
            clearInterval(timer);
        }
    }, [isAuthenticated])


    return(
        <React.Fragment>
            {/* This component will not display any thing on UI */}
        </React.Fragment>
    );
}

const mapStateToProps =(state)=>{
    const {LoginModel} = state;
    return{
        isAuthenticated : LoginModel.isAuthenticated,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch,
        logOut : ()=> dispatch(Actions.logOut()),
        openSessionTimeOutModalOpen : ()=> dispatch(SessionTimeOutActions.openSessionTimeOutModalOpen()),
        closeSessionTimeOutModalOpen : ()=> dispatch(SessionTimeOutActions.closeSessionTimeOutModalOpen()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authenticator);