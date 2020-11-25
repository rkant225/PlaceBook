import API from '../API/api';
import {startLoading, stopLoading} from './loadingActions';

export const signUp =(signUpData)=>{
    return async (dispatch)=>{
        startLoading(dispatch);
        const path = '/api/users/signup';
        
        const response = await API.request(path, 'Post', signUpData);
        console.log('response', response);

        if(response.isSuccessfull){
            dispatch({ type: 'LOGIN', payload : response.user});
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
            dispatch({ type: 'LOGIN', payload : response.user});
            dispatch({type : 'DISPALY_SUCCESS_MESSAGE', payload : 'Logged in successfully.'});
            stopLoading(dispatch);
        } else {
            console.log('Error..')
            dispatch({type : 'DISPALY_SERVER_ERROR', payload : response.errorMessage});
            stopLoading(dispatch);
        }        
    }          
}

export const logOut =()=>{
    return async (dispatch)=>{
        dispatch({ type: 'LOGOUT'});
    }          
}