
export const openSessionTimeOutModalOpen =()=>{
    return async (dispatch)=>{
        dispatch({ type: 'OPEN_SESSION_TIME_OUT_MODAL'});
    }          
}

export const closeSessionTimeOutModalOpen =()=>{
    return async (dispatch)=>{
        dispatch({ type: 'CLOSE_SESSION_TIME_OUT_MODAL'});
    }          
}

