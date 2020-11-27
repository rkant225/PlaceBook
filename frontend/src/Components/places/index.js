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


const Places = (props)=>{

    const {match,history, dispatch} = props;
    const {loggedInUserDetails, currentlySelectedUser} = props;
    const {getPlacesOfUser, placesOfSelectedUser, deletePlace, isAuthenticated} = props;
    const {userId} = useParams(); // useParams() hook provided by react-router-dom : it will return you an object which contains all the dynamic parameters present in route.

    const [openDeletConfirmationModal, setOpenDeletConfirmationModal] = useState(false);
    const [openGoogleMapsModal, setOpenGoogleMapsModal] = useState(false);
    const [currentlySelectedPlace, setCurrentlySelectedPlace] = useState({});

    // ComponentDidMount
    useEffect(()=>{
        if(userId){
            getPlacesOfUser(userId);
            dispatch({type : 'UPDATE_CURRENTLY_SELECTED_USER', payload : userId});
        }
    }, [userId])

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
        const callBack = ()=>{getPlacesOfUser(userId)};
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

            {currentlySelectedUser && loggedInUserDetails &&
                <h1>{currentlySelectedUser.id == loggedInUserDetails.id ? "Your all Places created till date." : `${currentlySelectedUser.name}'s all places created till date.`}</h1>
            }

            <Grid container spacing={3}>
                {placesOfSelectedUser.map((place)=>
                    <Place
                        key={place.id}
                        place={place}
                        onPlaceEdit={onPlaceEdit}
                        onPlaceDelete={onPlaceDelete}
                        onOpenPlaceOnGoogleMaps={onOpenPlaceOnGoogleMaps}
                    />
                )}
            </Grid>

            {/* If there are no places then, provide user a button to add new place. */}
            {placesOfSelectedUser.length === 0 && 
                <NoPlacesFound history={history}/>
            }

            {openGoogleMapsModal && <GoogleMapsModal place={currentlySelectedPlace} onClose={()=>{setOpenGoogleMapsModal(false)}}/>}
            {openDeletConfirmationModal && <DeleteConfirmationModal onClose={()=>setOpenDeletConfirmationModal(false)} onDeleteConfirmationClick={onDeleteConfirmationClick}/>}

        </React.Fragment>
    );
}

const mapStateToProps =(state)=>{
    const {PlacesModel, LoginModel, UsersModel} = state;
    return{
        placesOfSelectedUser : PlacesModel.placesOfSelectedUser,
        isAuthenticated : LoginModel.isAuthenticated,
        loggedInUserDetails : LoginModel.loggedInUserDetails,
        currentlySelectedUser : UsersModel.currentlySelectedUser,

    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch,
        getPlacesOfUser : (userId)=> dispatch(Actions.getPlacesOfUser(userId)),
        deletePlace : (placeId, callBack)=> dispatch(Actions.deletePlace(placeId, callBack)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Places);