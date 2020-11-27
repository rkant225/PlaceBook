import API from '../API/api';
import {startLoading, stopLoading} from './loadingActions';

export const signUp =(signUpData)=>{
    return async (dispatch)=>{
        startLoading(dispatch);
        const path = '/api/users/signup';
        
        const response = await API.request(path, 'Post', signUpData);

        if(response.isSuccessfull){
            dispatch({ type: 'LOGIN', payload : {user : response.user, access_token : response.access_token, refresh_token : response.refresh_token}});
            dispatch({type : 'DISPALY_SUCCESS_MESSAGE', payload : 'Account created successfully, And now you are logged in.'});
            stopLoading(dispatch);
        } else {
            dispatch({type : 'DISPALY_SERVER_ERROR', payload : response.errorMessage});
            stopLoading(dispatch);
        }        
    }          
}

export const login =(loginData)=>{
    return async (dispatch)=>{
        startLoading(dispatch);
        const path = '/api/users/login';
        
        const response = await API.request(path, 'Post', loginData);

        if(response.isSuccessfull){
            dispatch({ type: 'LOGIN', payload : {user : response.user, access_token : response.access_token, refresh_token : response.refresh_token}});
            dispatch({type : 'DISPALY_SUCCESS_MESSAGE', payload : 'Logged in successfully.'});
            stopLoading(dispatch);
        } else {
            dispatch({type : 'DISPALY_SERVER_ERROR', payload : response.errorMessage});
            stopLoading(dispatch);
        }        
    }          
}

export const reNewAccessToken =(refresh_token)=>{
    return async (dispatch)=>{
        startLoading(dispatch);
        const path = '/api/users/reNewAccessToken';
        const response = await API.request(path, 'Post', {refresh_token : refresh_token});

        if(response.isSuccessfull){
            dispatch({ type: 'RE_NEW_ACCESS_TOKEN', payload : {access_token : response.access_token} });
            // dispatch({type : 'DISPALY_SUCCESS_MESSAGE', payload : `New Access token : ${response.access_token}`});
            stopLoading(dispatch);
        } else {
            dispatch({type : 'DISPALY_SERVER_ERROR', payload : response.errorMessage || "You need to login again."});
            stopLoading(dispatch);
        }        
    }          
}

export const logOut =()=>{
    return async (dispatch)=>{
        dispatch({ type: 'LOGOUT'});
    }          
}