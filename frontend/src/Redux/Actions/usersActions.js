import API from '../API/api';
import {startLoading, stopLoading} from './loadingActions';

export const getAllUsers =()=>{
    return async (dispatch)=>{
        startLoading(dispatch);
        const path = '/api/users';
        const response = await API.request(path, 'Get');

        console.log('response', response)

        if(response.isSuccessfull){
            dispatch({ type: 'GET_USERS', payload: response.users || []});
            // dispatch({type : 'DISPALY_SUCCESS_MESSAGE', payload : 'Users fetched successfully.'});
            stopLoading(dispatch);
        } else {
            dispatch({type : 'DISPALY_SERVER_ERROR', payload : 'Unable to fetch places.'});
            stopLoading(dispatch);
        }        
    }          
}