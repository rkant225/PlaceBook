import { Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getFormInitialValues } from 'redux-form';
import AddOrEditPlaceForm from './addOrEditPlaceForm';

const AddNewPlace = (props)=>{
    const {placeId} = useParams();
    const isEdit = placeId ? true : false;

    const onNewPlaceAddition = (formData)=>{
        console.log(formData)
    }


    const getFormInitialValues = ()=>{
        const initialValues = {
            title : isEdit ? 'Pink CIty' : '',
            address : isEdit ? 'Rajasthan Jaipur' : '',
            description : isEdit ? 'This is the best city, situated in north west part of india.' : ''
        }
        return initialValues;
    }

    return(
        <React.Fragment>
            <Grid container>
                <Grid md={4}></Grid>
                <Grid xs={12} md={4}>
                    <Paper style={{marginTop : '3rem'}}>
                        <Typography style={{padding : '.5rem', backgroundColor : '#3f51b5', color : 'white', fontWeight : '900', textAlign : 'center'}}>
                                {isEdit ? "Edit Place" : "Add New Place"}
                        </Typography>

                        <div style={{padding : '1.5rem'}}>
                            <AddOrEditPlaceForm isEdit={isEdit} onSubmit={onNewPlaceAddition} initialValues={getFormInitialValues()}/>
                        </div>
                    </Paper>
                </Grid>
                <Grid md={4}></Grid>
            </Grid>
        </React.Fragment>
    );
}

export default AddNewPlace;