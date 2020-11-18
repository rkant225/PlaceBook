const initialState={
    errorMessage : "",
    hasErrorMessage : false
}

export default function serverErrorMessageReducer(state=initialState, action){
    switch(action.type){
        case 'DISPALY_SERVER_ERROR':
            return {
            ...state,
            errorMessage : action.payload,
            hasErrorMessage : true
            }
        case 'HIDE_SERVER_ERROR':
            return {
                ...state,
                errorMessage : "",
                hasErrorMessage : false
            }
        default :
            return {
                ...state
            }
    }
}