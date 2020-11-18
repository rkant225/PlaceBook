const initialState = {
    isAuthenticated : false,
    currentUserDetails : {}
};

const loginReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'LOGIN' :
            return {
                ...state,
                isAuthenticated : true
            }
        case 'LOGOUT' :
            return {
                ...state,
                isAuthenticated : false
            }
        case 'ADD_CURRENT_USER_DETAILS' :
            return {
                ...state,
                currentUserDetails : action.payload
            }
        default :
            return {
                ...state
            }
    }
}

export default loginReducer;