
import API from '../API/api';
import {startLoading, stopLoading} from './loadingActions';

export const fetchPlaces =()=>{
    return async (dispatch)=>{
        startLoading(dispatch);
        const path = 'https://jsonplaceholder.typicode.com/users';
        const users = await API.request(path, 'Get');

        if(users){
            dispatch({ type: 'GET_PLACES', payload: users || []});
            dispatch({type : 'DISPALY_SUCCESS_MESSAGE', payload : 'Places fetched successfully.'});
            stopLoading(dispatch);
        } else {
            dispatch({type : 'DISPALY_SERVER_ERROR', payload : 'Unable to fetch places.'});
            stopLoading(dispatch);
        }        
    }          
}