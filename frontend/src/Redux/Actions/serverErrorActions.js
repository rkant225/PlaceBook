export const displayServerError = (errorMessage) =>{
    return{
        type : 'DISPALY_SERVER_ERROR',
        payload : errorMessage
    }
}

export const hideServerError = () =>{
    return{
        type : 'HIDE_SERVER_ERROR'
    }
}