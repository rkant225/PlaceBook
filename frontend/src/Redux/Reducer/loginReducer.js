const initialState = {
    isAuthenticated : false,
    loggedInUserDetails : {},
};

const loginReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'LOGIN' :
            sessionStorage.setItem('access_token', action.payload.access_token);
            sessionStorage.setItem('refresh_token', action.payload.refresh_token);
            return {
                ...state,
                isAuthenticated : true,
                loggedInUserDetails : action.payload.user,
            }
        case 'RE_NEW_ACCESS_TOKEN' :
            sessionStorage.setItem('access_token', action.payload.access_token);
            return {
                ...state,
            }
        case 'LOGOUT' :
            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('refresh_token');
            return {
                ...state,
                isAuthenticated : false,
                loggedInUserDetails : {},
            }
        default :
            return {
                ...state
            }
    }
}

export default loginReducer;