import { Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import LoginForm from './loginForm';
import SignUpForm from './signUpForm';
import queryString from 'query-string';

import * as Actions from '../../Redux/Actions/loginActions';

const Login = (props)=>{
    const {location} = props;
    const {signUp, login, isAuthenticated} = props;

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [file, setFile] = useState(undefined);
    const [fileError, setFileError] = useState('');

    const [sessionExpirationError, setSessionExpirationError] = useState('');

    useEffect(()=>{
        const reason = queryString.parse(location.search).reason;
        if(reason == 'sessionExpired'){
            setSessionExpirationError('Session expired, please login again.')
        }
        if(reason == 'didNotLoggedOutForLongTime'){
            setSessionExpirationError(`It's been long time you have't logged Off. You have been logged Out for security reasons. Please login again.`)
        }
    },[])

    const handleLogin = (formData) =>{
        const { email, password} = formData;
        const loginData = {email, password};
        login(loginData);
    }

    const handleSignUp = (formData) =>{
        const {name, email, password} = formData;

        // We will not pass data in JSON format, because we have to upload an image which is of binary type.
        // const signUpData = {name, email, password};
        // signUp(signUpData);

        if(file){
            setFileError('');

            const formData = new FormData(); //Note : FormData can carry Binary data as well, but JSON can't.

            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('image', file); // Binary file data

            signUp(formData);
        } else {
            setFileError('Please attach an image.');
        }
    }

    const toggleLoginOrSignUpMode = ()=>{
        setIsLoginMode(!isLoginMode);
    }

    const handleFileChange = (event) =>{
        const file = event.target.files[0];
        if(file){
            setFile(file);
            setFileError('');
        }
    }

    return(
        <React.Fragment>

            {isAuthenticated && <Redirect to="/"/> }

            <Grid container>
                <Grid item xs={12} md={4}></Grid>
                <Grid item xs={12} md={4}>
                    {isLoginMode && 
                        <React.Fragment>
                            {sessionExpirationError && <Typography align="center" variant="h5" style={{color : 'red', marginTop : '1rem'}}>{sessionExpirationError}</Typography>}
                        
                            <Paper style={{marginTop : '3rem'}}>
                                <Typography style={{padding : '.5rem', backgroundColor : '#3f51b5', color : 'white', fontSize : '1.5rem', fontWeight : '900', textAlign : 'center'}}>
                                    Login
                                </Typography>
                                <div style={{padding : '1rem'}}>
                                    <LoginForm onSubmit={handleLogin}/>
                                </div>
                                <div style={{width : '60%', margin : 'auto',  padding : '1rem', borderTop : '1px solid blue', textAlign : 'center'}}>
                                    <Typography style={{fontSize : '1.3rem'}}>
                                        Don't have account?
                                    </Typography>
                                    <Link to="#" style={{color : 'blue', fontSize : '1.1rem'}} onClick={toggleLoginOrSignUpMode}>Create New Account</Link>
                                </div>
                            </Paper>
                        </React.Fragment>
                    }

                    {!isLoginMode && 
                        <Paper style={{marginTop : '3rem'}}>
                            <Typography style={{padding : '.5rem', backgroundColor : '#3f51b5', color : 'white', fontSize : '1.5rem', fontWeight : '900', textAlign : 'center'}}>
                                Sign Up
                            </Typography>
                            <div style={{padding : '1rem'}}>
                                <SignUpForm onSubmit={handleSignUp} handleFileChange={handleFileChange} fileError={fileError}/>
                            </div>
                            <div style={{width : '60%', margin : 'auto',  padding : '1rem', borderTop : '1px solid blue', textAlign : 'center'}}>
                                <Typography style={{fontSize : '1.3rem'}}>
                                    Already have account?
                                </Typography>
                                <Link to="#" style={{color : 'blue', fontSize : '1.1rem'}} onClick={toggleLoginOrSignUpMode}>Login</Link>
                            </div>
                        </Paper>
                    }

                </Grid>
                <Grid item xs={12} md={4}></Grid>
            </Grid>
            
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
        login : (loginData)=> dispatch(Actions.login(loginData)),
        signUp : (signUpData)=> dispatch(Actions.signUp(signUpData)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);