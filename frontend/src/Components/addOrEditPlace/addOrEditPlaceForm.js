import { Button, TextField, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import {Field, reduxForm} from 'redux-form';
import validateDetailsForm from './validateAddNewPlaceForm';

const renderTextField = ({ input, myLabel, meta: { touched, error }, maxLength, ...custom }) => {
    return <TextField fullWidth variant="filled" label={myLabel} error={touched && error !== undefined} helperText={touched && error} {...input} {...custom} inputProps={{'aria-label': `${myLabel} text box`, maxLength : maxLength || 256}} />
}

const AddOrEditPlaceForm = (props)=>{
    const {isEdit, onSubmit} = props; // Comming from parent
    const { handleSubmit, pristine, reset, submitting } = props;
    
    useEffect(()=>{
        reset();
    },[])
    return(
        <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <React.Fragment>
                    <Field name="title" disabled={isEdit} label="Title" maxLength={20} component={renderTextField}/>
                    <Field name="address" label="Address" maxLength={40} component={renderTextField} style={{marginTop : '1rem'}}/>
                    <Field name="description" label="Description" maxLength={250} component={renderTextField} style={{marginTop : '1rem'}}/>

                    <Typography align="right" style={{marginTop : '1rem'}}>
                    <Button  type="submit" variant="contained" color="primary" disabled={pristine || submitting}>{isEdit ? "Update Place" : "Add Place"}</Button>
                    </Typography>
                </React.Fragment>
            </form>
        </React.Fragment>
    );
}

export default reduxForm({form : 'AddNewPlace',  destroyOnUnmount : true, enableReinitialize : true, validate : validateDetailsForm})(AddOrEditPlaceForm);