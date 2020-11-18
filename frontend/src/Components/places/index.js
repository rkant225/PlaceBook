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


const PLACES = [
    {id : 'a', userId : 1, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/500`, title : 'City of kings', description : 'I have not much to say.', address : 'Street 145, Modal town 233212, Rajasthan', coordinates : {lat : 90.5, lng : 143.87} },
    {id : 'b', userId : 1, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/500`, title : 'City of kings', description : 'Description of this place goes like this, And this is the best description of this place. City of kings', address : 'Street 145, Modal town 233212, Rajasthan', coordinates : {lat : 90.5, lng : 143.87} },
    {id : 'c', userId : 1, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/500`, title : 'City of kings', description : 'Description of this place goes like this, And this is the best description of this place. City of kings', address : 'Street 145, Modal town 233212, Rajasthan', coordinates : {lat : 90.5, lng : 143.87} },
    {id : 'd', userId : 2, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/500`, title : 'City of kings', description : 'Description of this place goes like this, And this is the best description of this place. City of kings', address : 'Street 145, Modal town 233212, Rajasthan', coordinates : {lat : 90.5, lng : 143.87} },
    {id : 'e', userId : 2, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/500`, title : 'City of kings', description : 'Description of this place goes like this, And this is the best description of this place. City of kings', address : 'Street 145, Modal town 233212, Rajasthan', coordinates : {lat : 90.5, lng : 143.87} },
    {id : 'f', userId : 2, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/500`, title : 'City of kings', description : 'Description of this place goes like this, And this is the best description of this place. City of kings', address : 'Street 145, Modal town 233212, Rajasthan', coordinates : {lat : 90.5, lng : 143.87} },
    {id : 'g', userId : 2, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/500`, title : 'City of kings', description : 'Description of this place goes like this, And this is the best description of this place. City of kings', address : 'Street 145, Modal town 233212, Rajasthan', coordinates : {lat : 90.5, lng : 143.87} },
    {id : 'h', userId : 2, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/500`, title : 'City of kings', description : 'Description of this place goes like this, And this is the best description of this place. City of kings', address : 'Street 145, Modal town 233212, Rajasthan', coordinates : {lat : 90.5, lng : 143.87} },
    {id : 'i', userId : 3, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/500`, title : 'City of kings', description : 'Description of this place goes like this, And this is the best description of this place. City of kings', address : 'Street 145, Modal town 233212, Rajasthan', coordinates : {lat : 90.5, lng : 143.87} },
    {id : 'j', userId : 3, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/500`, title : 'City of kings', description : 'Description of this place goes like this, And this is the best description of this place. City of kings', address : 'Street 145, Modal town 233212, Rajasthan', coordinates : {lat : 90.5, lng : 143.87} },
    {id : 'k', userId : 4, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/500`, title : 'City of kings', description : 'Description of this place goes like this, And this is the best description of this place. City of kings', address : 'Street 145, Modal town 233212, Rajasthan', coordinates : {lat : 90.5, lng : 143.87} },
    {id : 'l', userId : 4, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/500`, title : 'City of kings', description : 'Description of this place goes like this, And this is the best description of this place. City of kings', address : 'Street 145, Modal town 233212, Rajasthan', coordinates : {lat : 90.5, lng : 143.87} },
    {id : 'm', userId : 5, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/500`, title : 'City of kings', description : 'Description of this place goes like this, And this is the best description of this place. City of kings', address : 'Street 145, Modal town 233212, Rajasthan', coordinates : {lat : 90.5, lng : 143.87} },
    {id : 'n', userId : 6, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/500`, title : 'City of kings', description : 'Description of this place goes like this, And this is the best description of this place. City of kings', address : 'Street 145, Modal town 233212, Rajasthan', coordinates : {lat : 90.5, lng : 143.87} },
    {id : 'o', userId : 7, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/500`, title : 'City of kings', description : 'Description of this place goes like this, And this is the best description of this place. City of kings', address : 'Street 145, Modal town 233212, Rajasthan', coordinates : {lat : 90.5, lng : 143.87} },
    {id : 'p', userId : 7, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/500`, title : 'City of kings', description : 'Description of this place goes like this, And this is the best description of this place. City of kings', address : 'Street 145, Modal town 233212, Rajasthan', coordinates : {lat : 90.5, lng : 143.87} },
    {id : 'q', userId : 7, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/500`, title : 'City of kings', description : 'Description of this place goes like this, And this is the best description of this place. City of kings', address : 'Street 145, Modal town 233212, Rajasthan', coordinates : {lat : 90.5, lng : 143.87} },
    {id : 'r', userId : 8, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/500`, title : 'City of kings', description : 'Description of this place goes like this, And this is the best description of this place. City of kings', address : 'Street 145, Modal town 233212, Rajasthan', coordinates : {lat : 90.5, lng : 143.87} },
    {id : 's', userId : 8, imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/500`, title : 'City of kings', description : 'Description of this place goes like this, And this is the best description of this place. City of kings', address : 'Street 145, Modal town 233212, Rajasthan', coordinates : {lat : 90.5, lng : 143.87} },
]

const Places = (props)=>{
    console.log(props)
    const {match,history} = props;
    const {isAuthenticated} = props;
    const {userId} = useParams(); // useParams() hook provided by react-router-dom : it will return you an object which contains all the dynamic parameters present in route.

    const [openDeletConfirmationModal, setOpenDeletConfirmationModal] = useState(false);
    const [openGoogleMapsModal, setOpenGoogleMapsModal] = useState(false);
    const [currentlySelectedPlace, setCurrentlySelectedPlace] = useState({});

    // ComponentDidMount
    useEffect(()=>{
        props.fetchPlaces();
    }, [])

    const onPlaceEdit =(place)=>{
        const {id} = place;
        console.log('Editing place with place ID : ', id);
        history.push(`/edit-place/${id}`)
    }

    const onPlaceDelete =(place)=>{
        const {id} = place;
        console.log('Deleting place with place ID : ', id);
        setCurrentlySelectedPlace(place);
        setOpenDeletConfirmationModal(true);
    }

    const onDeleteConfirmationClick = () =>{
        const {id} = currentlySelectedPlace;
        console.log('I have deleted Place whose Id is : ', id);
        setOpenDeletConfirmationModal(false);
    }

    const onOpenPlaceOnGoogleMaps =(place)=>{
        const {id} = place;
        console.log('Opening google maps for place with place ID : ', id);
        
        setCurrentlySelectedPlace(place);
        setOpenGoogleMapsModal(true);
    }



    return(
        <React.Fragment>
            <h1>Places for user : {userId} </h1>

            <Grid container spacing={3}>
                {PLACES.filter(place=> place.userId == userId).map((place)=> (
                    <Place
                        isAuthenticated={isAuthenticated}
                        
                        place={place}

                        onPlaceEdit={onPlaceEdit}
                        onPlaceDelete={onPlaceDelete}
                        onOpenPlaceOnGoogleMaps={onOpenPlaceOnGoogleMaps}
                    />) 
                )}
            </Grid>

            {/* If there are no places then, provide user a button to add new place. */}
            {PLACES.filter(place=> place.userId == userId).length === 0 && 
                <NoPlacesFound history={history}/>
            }

            {openGoogleMapsModal && <GoogleMapsModal place={currentlySelectedPlace} onClose={()=>{setOpenGoogleMapsModal(false)}}/>}
            {openDeletConfirmationModal && <DeleteConfirmationModal onClose={()=>setOpenDeletConfirmationModal(false)} onDeleteConfirmationClick={onDeleteConfirmationClick}/>}

        </React.Fragment>
    );
}

const mapStateToProps =(state)=>{
    const {PlacesModel, LoginModel} = state;
    return{
        places : PlacesModel.places,
        isAuthenticated : LoginModel.isAuthenticated,

    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch,
        fetchPlaces : ()=> dispatch(Actions.fetchPlaces()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Places);