import Axios from 'axios';
import {BASE_API_URL} from '../../Config';

const request = async (path, method, data) =>{

    const contentType = 'application/json';
    const responseType = 'json';
    const httpMethod = method || "get";

    const headerConfig ={ "Content-Type": contentType };

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