export const displayServerSuccessMessage = (successMessage) =>{
    return{
        type : 'DISPALY_SUCCESS_MESSAGE',
        payload : successMessage
    }
}

export const hideServerSuccessMessage = () =>{
    return{
        type : 'HIDE_SUCCESS_MESSAGE'
    }
}