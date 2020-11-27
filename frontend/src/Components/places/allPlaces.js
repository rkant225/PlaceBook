import { Grid} from '@material-ui/core';
import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
import Place from './place';
import NoPlacesFound from './noPlacesFound';
import GoogleMapsModal from './googleMapsModal';
import { connect } from 'react-redux';

import * as Actions from '../../Redux/Actions/placesActions';
import { useEffect } from 'react';
import DeleteConfirmationModal from './deleteConfirmationModal';


const AllPlaces = (props)=>{

    const {match,history} = props;
    const {loggedInUserDetails, currentlySelectedUser} = props;
    const {getAllPlaces, allPlaces, deletePlace, isAuthenticated} = props;

    const [openDeletConfirmationModal, setOpenDeletConfirmationModal] = useState(false);
    const [openGoogleMapsModal, setOpenGoogleMapsModal] = useState(false);
    const [currentlySelectedPlace, setCurrentlySelectedPlace] = useState({});

    // ComponentDidMount
    useEffect(()=>{
        getAllPlaces();
    }, [])

    const onPlaceEdit =(place)=>{
        const {id} = place;
        history.push(`/edit-place/${id}`)
    }

    const onPlaceDelete =(place)=>{
        const {id} = place;
        setCurrentlySelectedPlace(place);
        setOpenDeletConfirmationModal(true);
    }

    const onDeleteConfirmationClick = () =>{
        const {id} = currentlySelectedPlace;
        const callBack = ()=>{getAllPlaces()};
        deletePlace(id, callBack);
        setOpenDeletConfirmationModal(false);
    }

    const onOpenPlaceOnGoogleMaps =(place)=>{
        const {id} = place;
        setCurrentlySelectedPlace(place);
        setOpenGoogleMapsModal(true);
    }



    return(
        <React.Fragment>
            <h1>All the places created till date.</h1>

            <Grid container spacing={3}>
                {allPlaces && allPlaces.map((place)=>
                    <Place
                        key={place.id}
                        place={place}
                        onPlaceEdit={onPlaceEdit}
                        onPlaceDelete={onPlaceDelete}
                        onOpenPlaceOnGoogleMaps={onOpenPlaceOnGoogleMaps}
                    />
                )}
            </Grid>

            {openGoogleMapsModal && <GoogleMapsModal place={currentlySelectedPlace} onClose={()=>{setOpenGoogleMapsModal(false)}}/>}
            {openDeletConfirmationModal && <DeleteConfirmationModal onClose={()=>setOpenDeletConfirmationModal(false)} onDeleteConfirmationClick={onDeleteConfirmationClick}/>}

        </React.Fragment>
    );
}

const mapStateToProps =(state)=>{
    const {PlacesModel, LoginModel, UsersModel} = state;
    return{
        allPlaces : PlacesModel.allPlaces,
        loggedInUserDetails : LoginModel.loggedInUserDetails,
        currentlySelectedUser : UsersModel.currentlySelectedUser,

    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch,
        getAllPlaces : ()=> dispatch(Actions.getAllPlaces()),
        deletePlace : (placeId, callBack)=> dispatch(Actions.deletePlace(placeId, callBack)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AllPlaces);