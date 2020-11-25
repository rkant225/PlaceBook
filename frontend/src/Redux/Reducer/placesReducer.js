const initialState = {
    allPlaces : [],
    placesOfSelectedUser : [],
    currentlySelectedPlace : {}
};

const placesReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'GET_ALL_PLACES' :
            return {
                ...state,
                allPlaces : action.payload
            }
        case 'GET_PLACES_OF_SELECTED_USER' :
            return {
                ...state,
                placesOfSelectedUser : action.payload
            }
        case 'GET_PLACES_BY_PLACE_ID' :
            return {
                ...state,
                currentlySelectedPlace : action.payload
            }
        default :
            return {
                ...state
            }
    }
}

export default placesReducer;