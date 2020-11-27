const initialState = {
    isSessionTimeOutModalOpen : false,
};

const sessionTimeOutReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'OPEN_SESSION_TIME_OUT_MODAL' :
            return {
                ...state,
                isSessionTimeOutModalOpen : true
            }
        case 'CLOSE_SESSION_TIME_OUT_MODAL' :
            return {
                ...state,
                isSessionTimeOutModalOpen : false
            }
        default :
            return {
                ...state
            }
    }
}

export default sessionTimeOutReducer;