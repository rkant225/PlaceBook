import { Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddOrEditPlaceForm from './addOrEditPlaceForm';
import * as Actions from '../../Redux/Actions/placesActions';

const AddOrEditPlace = (props)=>{
    const {history} = props;
    const {loggedInUserDetails} = props;
    const {id, name, email} = loggedInUserDetails;
    const {addNewPlace, editExistingPlace, getPlaceByPlaceId, currentlySelectedPlace} = props;
    const {placeId} = useParams();
    const isEdit = placeId ? true : false;

    const [file, setFile] = useState(undefined);
    const [fileError, setFileError] = useState('');

    useEffect(()=>{
        if(placeId){
            getPlaceByPlaceId(placeId);
        }
    }, [placeId]);

    const onNewPlaceAddOrEdit = (formData)=>{
        const {address, description, title} = formData;
        const callBack = ()=>{history.push(`/places/${loggedInUserDetails.id}`)}

        if(isEdit){ // EDIT
            // placeId, title, description, address
            const updatedPlaceData = {
                placeId : placeId,
                title : title,
                address : address,
                description : description,
            };
            editExistingPlace(updatedPlaceData, callBack);
        } else { // ADD
            if(file){
                setFileError('');

                // We will not pass data in JSON format, because we have to upload an image which is of binary type.
                // const newPlaceData = { userId : id, title : title, address : address, description : description};
                // addNewPlace(newPlaceData, callBack);

                const formData = new FormData(); //Note : FormData can carry Binary data as well, but JSON can't.

                formData.append('userId', id);
                formData.append('title', title);
                formData.append('address', address);
                formData.append('description', description);
                formData.append('image', file); // Binary file.

                addNewPlace(formData, callBack);
            } else {
                setFileError('Please attach an image.');
            }
            
        }
    }


    const getFormInitialValues = ()=>{
        if(currentlySelectedPlace && isEdit){
            const {title, address, description} = currentlySelectedPlace;
            const initialValues = {
                title : title,
                address : address,
                description : description
            }
            return initialValues;
        } else {
            return {
                title : '',
                address : '',
                description : ''
            }
        }
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
            <Grid container>
                <Grid item md={4}></Grid>
                <Grid item xs={12} md={4}>
                    <Paper style={{marginTop : '3rem'}}>
                        <Typography style={{padding : '.5rem', backgroundColor : '#3f51b5', color : 'white', fontWeight : '900', textAlign : 'center'}}>
                                {isEdit ? "Edit Place" : "Add New Place"}
                        </Typography>

                        <div style={{padding : '1.5rem'}}>
                            <AddOrEditPlaceForm 
                                isEdit={isEdit}
                                onSubmit={onNewPlaceAddOrEdit}
                                initialValues={getFormInitialValues()}
                                handleFileChange={handleFileChange}
                                fileError={fileError}
                            />
                        </div>
                    </Paper>
                </Grid>
                <Grid item md={4}></Grid>
            </Grid>
        </React.Fragment>
    );
}

const mapStateToProps =(state)=>{
    const {PlacesModel, LoginModel} = state;
    return{
        currentlySelectedPlace : PlacesModel.currentlySelectedPlace,
        isAuthenticated : LoginModel.isAuthenticated,
        loggedInUserDetails : LoginModel.loggedInUserDetails,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch,
        addNewPlace : (newPlaceData, callBack)=> dispatch(Actions.addNewPlace(newPlaceData, callBack)),
        editExistingPlace : (updatedPlaceData, callBack)=> dispatch(Actions.editExistingPlace(updatedPlaceData, callBack)),
        getPlaceByPlaceId : (placeId)=> dispatch(Actions.getPlaceByPlaceId(placeId)),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddOrEditPlace);