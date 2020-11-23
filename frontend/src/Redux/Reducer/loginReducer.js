const initialState = {
    isAuthenticated : false,
    loggedInUserDetails : {}
};

const loginReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'LOGIN' :
            return {
                ...state,
                isAuthenticated : true,
                loggedInUserDetails : action.payload
            }
        case 'LOGOUT' :
            return {
                ...state,
                isAuthenticated : false,
                loggedInUserDetails : {}
            }
        default :
            return {
                ...state
            }
    }
}

export default loginReducer;