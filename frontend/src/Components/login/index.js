import { Grid, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import LoginForm from './loginForm';
import SignUpForm from './signUpForm';

import * as Actions from '../../Redux/Actions/loginActions';

const Login = (props)=>{

    const {signUp, login, isAuthenticated} = props;

    const [isLoginMode, setIsLoginMode] = useState(true);

    const handleLogin = (formData) =>{
        const {email, password} = formData;
        login(email, password);
    }

    const handleSignUp = (formData) =>{
        const {name, email, password} = formData;
        signUp(name, email, password);
    }

    const toggleLoginOrSignUpMode = ()=>{
        setIsLoginMode(!isLoginMode);
    }

    return(
        <React.Fragment>

            {isAuthenticated && <Redirect to="/"/> }

            <Grid container>
                <Grid item xs={12} md={4}></Grid>
                <Grid item xs={12} md={4}>
                    {isLoginMode && 
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
                    }

                    {!isLoginMode && 
                        <Paper style={{marginTop : '3rem'}}>
                            <Typography style={{padding : '.5rem', backgroundColor : '#3f51b5', color : 'white', fontSize : '1.5rem', fontWeight : '900', textAlign : 'center'}}>
                                Sign Up
                            </Typography>
                            <div style={{padding : '1rem'}}>
                                <SignUpForm onSubmit={handleSignUp}/>
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
        login : (email, password)=> dispatch(Actions.login(email, password)),
        signUp : (name, email, password)=> dispatch(Actions.signUp(name, email, password)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);