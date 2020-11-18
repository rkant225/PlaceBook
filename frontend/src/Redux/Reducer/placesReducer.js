const initialState = {
    places : [],
};

const placesReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'GET_PLACES' :
            return {
                ...state,
                places : action.payload
            }
        default :
            return {
                ...state
            }
    }
}

export default placesReducer;