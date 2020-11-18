const initialState={
    successMessage : "",
    hasSuccessMessage : false
}

export default function serverSuccessMessageReducer(state=initialState, action){
    switch(action.type){
        case 'DISPALY_SUCCESS_MESSAGE':
            return {
            ...state,
            successMessage : action.payload,
            hasSuccessMessage : true
            }
        case 'HIDE_SUCCESS_MESSAGE':
            return {
                ...state,
                successMessage : "",
                hasSuccessMessage : false
            }
        default :
            return {
                ...state
            }
    }
}