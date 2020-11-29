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

    const CHECK_VALIDITY_OF_ACCESSTOKEN_IN_TIME_INTERVEL_OF_THIS_MUCH_MILISECONDS = 1000 * 20 ; // In miloseconds
    const REMIND_IF_DIFFERENCE_IN_SECONDS_IS_LESS_THAN = 70; // In Seconds
    const LOGOUT_USER_BEFORE_THIS_MUCH_SECONDS_WHEN_REFRESH_TOKEN_IS_GOING_TO_EXPIRE = 70; // In Seconds

    // ------This is for Quick testing-----
    // const CHECK_VALIDITY_OF_ACCESSTOKEN_IN_TIME_INTERVEL_OF_THIS_MUCH_MILISECONDS = 1000 * 2 ; // In miloseconds
    // const REMIND_IF_DIFFERENCE_IN_SECONDS_IS_LESS_THAN = 30; // In Seconds
    // const LOGOUT_USER_BEFORE_THIS_MUCH_SECONDS_WHEN_REFRESH_TOKEN_IS_GOING_TO_EXPIRE = 10; // In Seconds
    // ------This is for Quick testing-----
    
    const {logOut, openSessionTimeOutModalOpen, closeSessionTimeOutModalOpen} = props; // Comming from Redux Actions
    const {isAuthenticated} = props; // Comming from Redux Store
    const history = useHistory(); // History to navigate user, If accesstoken is expired

    const access_token = sessionStorage.getItem('access_token');


    const LogOutUserIfTokenAlreadyExpired = () =>{
        const access_token = sessionStorage.getItem('access_token');
        const decodedToken = jwt_decode(access_token); // Decode the access token.
        const {exp} = decodedToken; // Get the expiry time.

        if(exp < Math.round(new Date().getTime() / 1000)){
            logOut(); // LogOut user
            history.push('/login?reason=sessionExpired')
        }
    }

    const ConsoleLogTheDetails =()=>{
        //-----------Access Token-----------
        const access_token = sessionStorage.getItem('access_token');
        const decodedToken_access = jwt_decode(access_token); // Decode the Access token.
        let {exp : access_token_expiry_time} = decodedToken_access; // Get the expiry time.
        const timeLeftToExpireAccessToken = access_token_expiry_time - Math.round(new Date().getTime() / 1000);
        //-----------Access Token-----------

        //-----------Refresh Token-----------
        const refresh_token = sessionStorage.getItem('refresh_token');
        const decodedToken_refresh = jwt_decode(refresh_token); // Decode the Refresh token.
        const {exp : refresh_token_expiry_time} = decodedToken_refresh; // Get the expiry time.
        const timeLeftToExpireRefreshToken = refresh_token_expiry_time - Math.round(new Date().getTime() / 1000);
        //-----------Refresh Token-----------

        console.log('xxxxxxxxxxxxxxx-----------xxxxxxxxxxxxx-----------xxxxxxxxxxxxxxxx-------------xxxxxxxxxxxxxxx');
        console.log(`Checking for access_token validity in interval of ${CHECK_VALIDITY_OF_ACCESSTOKEN_IN_TIME_INTERVEL_OF_THIS_MUCH_MILISECONDS/1000} seconds.`);
        console.log(`Your session will expire in ${timeLeftToExpireAccessToken / (60)} minutes (access_token will expire).`)
        console.log(`After ${timeLeftToExpireRefreshToken / (24 * 60 * 60)} days, You will be logged out automaticly (refresh_token will expire).`)
        console.log('xxxxxxxxxxxxxxx-----------xxxxxxxxxxxxx-----------xxxxxxxxxxxxxxxx-------------xxxxxxxxxxxxxxx');
    }


    // This method will check the expiry time of access token after a time interval and logs out the user if it is expired.
    const ValidateAccessAndRefreshTokenAndGiveWarningToUserBeforeForceLogOut = () =>{
        
        ConsoleLogTheDetails();

        //-------------------Verify Expiry Of REFRESH_TOKEN----------
        const refresh_token = sessionStorage.getItem('refresh_token');

        const decodedToken = jwt_decode(refresh_token); // Decode the access token.
        const {exp} = decodedToken; // Get the expiry time.
        const currentDifference = exp - Math.round(new Date().getTime() / 1000); // In Seconds
        if(currentDifference < LOGOUT_USER_BEFORE_THIS_MUCH_SECONDS_WHEN_REFRESH_TOKEN_IS_GOING_TO_EXPIRE){
            logOut(); // LogOut user
            history.push('/login?reason=didNotLoggedOutForLongTime')
        }
        //-------------------Verify Expiry Of REFRESH_TOKEN----------


        //-------------------Verify Expiry Of ACCESS_TOKEN----------
        const access_token = sessionStorage.getItem('access_token');
        if(access_token){
            const decodedToken = jwt_decode(access_token); // Decode the access token.
            const {exp} = decodedToken; // Get the expiry time.
            const currentDifference = exp - Math.round(new Date().getTime() / 1000); // In Seconds

            // Give warning and a chance to refresh the access token before it expires.
            if(currentDifference < REMIND_IF_DIFFERENCE_IN_SECONDS_IS_LESS_THAN){
                openSessionTimeOutModalOpen(); // Open Modal to ask user to retain the access_token
            }

            const isAccessTokenValid = (new Date().getTime() / 1000) < exp; // Verify if it is not expired
            // LogOut if access token is expired...
            if(!isAccessTokenValid){
                // clearInterval(accessTokenValidationTimer); // clear the Interval which is checking the expiry time of access token.
                closeSessionTimeOutModalOpen(); // Close the modal automaticly
                logOut(); // LogOut user
                history.push('/login?reason=sessionExpired')
            }
        }
        //-------------------Verify Expiry Of ACCESS_TOKEN----------

    }






    // This will run on every reload of this component. // 1. Any page is reloaded // 2. user is logged In // 3. user is logged Out
    useEffect(()=>{
        if(access_token){ // Chech if token is present in sessionStorage
            ConsoleLogTheDetails();
            LogOutUserIfTokenAlreadyExpired();
            timer = setInterval(ValidateAccessAndRefreshTokenAndGiveWarningToUserBeforeForceLogOut, CHECK_VALIDITY_OF_ACCESSTOKEN_IN_TIME_INTERVEL_OF_THIS_MUCH_MILISECONDS);
        }
    });

    // Clear interval once user is logged out.(Both manually and automaticly logout)
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