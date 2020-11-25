
import API from '../API/api';
import {startLoading, stopLoading} from './loadingActions';

export const getAllPlaces =()=>{
    return async (dispatch)=>{
        startLoading(dispatch);
        const path = `/api/places`;
        const response = await API.request(path, 'Get');

        if(response.isSuccessfull){
            dispatch({ type: 'GET_ALL_PLACES', payload: response.places || []});
            dispatch({type : 'DISPALY_SUCCESS_MESSAGE', payload : 'Places fetched successfully.'});
            stopLoading(dispatch);
        } else {
            dispatch({type : 'DISPALY_SERVER_ERROR', payload : 'Unable to fetch places.'});
            stopLoading(dispatch);
        }        
    }          
}

export const getPlacesOfUser =(userId)=>{
    return async (dispatch)=>{
        startLoading(dispatch);
        const path = `/api/places/placesOfUser/${userId}`;
        const response = await API.request(path, 'Get');

        if(response.isSuccessfull){
            dispatch({ type: 'GET_PLACES_OF_SELECTED_USER', payload: response.places || []});
            // dispatch({type : 'DISPALY_SUCCESS_MESSAGE', payload : 'Places fetched successfully.'});
            stopLoading(dispatch);
        } else {
            dispatch({type : 'DISPALY_SERVER_ERROR', payload : 'Unable to fetch places.'});
            stopLoading(dispatch);
        }        
    }          
}

export const addNewPlace =(newPlaceData, callBack)=>{
    return async (dispatch)=>{
        startLoading(dispatch);
        const path = `/api/places`;
        const response = await API.request(path, 'Post', newPlaceData);

        if(response.isSuccessfull){
            dispatch({type : 'DISPALY_SUCCESS_MESSAGE', payload : 'Places created successfully.'});
            stopLoading(dispatch);
            callBack();
        } else {
            dispatch({type : 'DISPALY_SERVER_ERROR', payload : response.errorMessage || 'Unable to add places.'});
            stopLoading(dispatch);
        }        
    }          
}

export const editExistingPlace =(updatedPlaceData, callBack)=>{
    return async (dispatch)=>{
        startLoading(dispatch);
        const path = `/api/places`;
        const response = await API.request(path, 'Patch', updatedPlaceData);

        if(response.isSuccessfull){
            dispatch({type : 'DISPALY_SUCCESS_MESSAGE', payload : 'Places updated successfully, and you are redirected to page where you can see and manage all your places.'});
            stopLoading(dispatch);
            callBack();
        } else {
            dispatch({type : 'DISPALY_SERVER_ERROR', payload : 'Unable to fetch places.'});
            stopLoading(dispatch);
        }        
    }          
}

export const getPlaceByPlaceId =(placeId)=>{
    return async (dispatch)=>{
        startLoading(dispatch);
        const path = `/api/places/${placeId}`;
        const response = await API.request(path, 'Get');

        if(response.isSuccessfull){
            dispatch({ type: 'GET_PLACES_BY_PLACE_ID', payload: response.place || {}});
            stopLoading(dispatch);
        } else {
            dispatch({type : 'DISPALY_SERVER_ERROR', payload : 'Unable to fetch places.'});
            stopLoading(dispatch);
        }        
    }          
}

export const deletePlace =(placeId, callBack)=>{
    return async (dispatch)=>{
        startLoading(dispatch);
        const path = `/api/places/${placeId}`;
        const response = await API.request(path, 'Delete');

        if(response.isSuccessfull){
            dispatch({type : 'DISPALY_SUCCESS_MESSAGE', payload : 'Places deleted successfully.'});
            stopLoading(dispatch);
            callBack();
        } else {
            dispatch({type : 'DISPALY_SERVER_ERROR', payload : 'Unable to delete places.'});
            stopLoading(dispatch);
        }        
    }          
}