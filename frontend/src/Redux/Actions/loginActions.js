import API from '../API/api';
import {startLoading, stopLoading} from './loadingActions';

export const signUp =()=>{
    return async (dispatch)=>{
        startLoading(dispatch);
        const path = 'https://jsonplaceholder.typicode.com/users';
        const users = await API.request(path, 'Get');

        if(users){
            dispatch({ type: 'LOGIN'});
            dispatch({type : 'ADD_CURRENT_USER_DETAILS', payload : {name : 'Paritosh Singh'}})
            dispatch({type : 'DISPALY_SUCCESS_MESSAGE', payload : 'Account created successfully, And now you are logged in.'});
            stopLoading(dispatch);
        } else {
            dispatch({type : 'DISPALY_SERVER_ERROR', payload : 'Unable Login, Please try again.'});
            stopLoading(dispatch);
        }        
    }          
}

export const login =()=>{
    return async (dispatch)=>{
        startLoading(dispatch);
        const path = 'https://jsonplaceholder.typicode.com/users';
        const users = await API.request(path, 'Get');

        if(users){
            dispatch({ type: 'LOGIN'});
            dispatch({type : 'ADD_CURRENT_USER_DETAILS', payload : {name : 'Rahul Singh'}})
            dispatch({type : 'DISPALY_SUCCESS_MESSAGE', payload : 'Logged in successfully.'});
            stopLoading(dispatch);
        } else {
            dispatch({type : 'DISPALY_SERVER_ERROR', payload : 'Unable Login, Please try again.'});
            stopLoading(dispatch);
        }        
    }          
}

export const logOut =()=>{
    return async (dispatch)=>{
        dispatch({ type: 'LOGOUT'});
    }          
}