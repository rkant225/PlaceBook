const initialState = {
    users : [],
    currentlySelectedUser : {}
};

const usersReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'GET_USERS' :
            return {
                ...state,
                users : action.payload
            }
        case 'UPDATE_CURRENTLY_SELECTED_USER' :
            const currentlySelectedUser = state.users.find((user)=>user.id == action.payload);
            return {
                ...state,
                currentlySelectedUser : currentlySelectedUser
            }
        default :
            return {
                ...state
            }
    }
}

export default usersReducer;