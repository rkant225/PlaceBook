import { Button, TextField, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import FileUpload from '../fileUpload/fileUpload';
import validateSignUpForm from './validateSignUpForm';

const renderTextField = ({ input, myLabel, meta: { touched, error }, maxLength, ...custom }) => {
    return <TextField fullWidth variant="filled" label={myLabel} error={touched && error !== undefined} helperText={touched && error} {...input} {...custom} inputProps={{'aria-label': `${myLabel} text box`, maxLength : maxLength || 256}} />
}

const SignUpForm = (props)=>{
    const {onSubmit, handleFileChange, fileError} = props; // Comming from parent
    const { handleSubmit, pristine, reset, submitting } = props;

    useEffect(()=>{
        reset();
    },[])

    return(
        <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Field name="name" label="Your name" component={renderTextField}/>
                <Field name="email" label="Email" component={renderTextField} style={{marginTop : '1rem'}}/>
                <Field name="password" type="password" label="Password" component={renderTextField} style={{marginTop : '1rem'}}/>
                <Field name="confirmPassword" type="password" label="Confirm password" component={renderTextField} style={{marginTop : '1rem', marginBottom : '1rem'}}/>

                <FileUpload handleFileChange={handleFileChange}/>
                {fileError && 
                    <div style={{color : 'red', marginTop : '.5rem'}}>{fileError}</div>
                }

                <Typography align="center">
                    <Button type="submit" variant="contained" color="primary" disabled={pristine || submitting}>Sign Up</Button>
                </Typography>
            </form>
        </React.Fragment>
    );
}

export default reduxForm({form : 'signUpForm', destroyOnUnmount : true, validate : validateSignUpForm })(SignUpForm);