import { Button, TextField, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import validateLoginForm from './validateLoginForm';

const renderTextField = ({ input, myLabel, meta: { touched, error }, maxLength, ...custom }) => {
    return <TextField fullWidth variant="filled" label={myLabel} error={touched && error !== undefined} helperText={touched && error} {...input} {...custom} inputProps={{'aria-label': `${myLabel} text box`, maxLength : maxLength || 256}} />
}

const LoginForm = (props)=>{
    const {onSubmit} = props; // Comming from parent
    const { handleSubmit, pristine, reset, submitting } = props;

    useEffect(()=>{
        reset();
    },[])

    return(
        <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Field name="email" label="Email" component={renderTextField}/>
                <Field name="password" label="Password" component={renderTextField} style={{marginTop : '1rem', marginBottom : '1rem'}}/>
                <Typography align="center">
                    <Button type="submit" variant="contained" color="primary" disabled={pristine || submitting}>Login</Button>
                </Typography>
            </form>
        </React.Fragment>
    );
}

export default reduxForm({form : 'loginForm', destroyOnUnmount : true, validate : validateLoginForm })(LoginForm);