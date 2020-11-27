import Axios from 'axios';
import {BASE_API_URL} from '../../Config';

const request = async (path, method, data) =>{

    const access_token = sessionStorage.getItem('access_token') || '';

    const contentType = 'application/json';
    const responseType = 'json';
    const httpMethod = method || "get";

    const headerConfig ={ 
        "Content-Type": contentType,
        Authorization : `Bearer ${access_token}`
    };

    const response = await Axios({ 
        method: httpMethod, 
        data : data || {},
        url: BASE_API_URL + path,
        headers: {...headerConfig},
        responseType: responseType,
    });

    return response.data;
}

export default {
    request : request
};