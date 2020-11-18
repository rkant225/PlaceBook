import Axios from 'axios';

const request = async (path, method, data) =>{

    const contentType = 'application/json';
    const responseType = 'json';
    const httpMethod = method || "get";

    const headerConfig ={ "Content-Type": contentType };

    const response = await Axios({ 
        method: httpMethod, 
        data : data || {},
        url: path,
        headers: {...headerConfig},
        responseType: responseType,
    });

    return response.data;
}

export default {
    request : request
};