import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import loginReducer from './loginReducer';
import usersReducer from './usersReducer';
import placesReducer from './placesReducer';
import loadingReducer from './loadingReducer';
import serverErrorReducer from './serverErrorReducer';
import serverSuccessReducer from './serverSuccessReducer';

export default combineReducers(
    {
        form : formReducer,
        LoginModel : loginReducer,
        UsersModel : usersReducer,
        PlacesModel : placesReducer,
        LoadingModel : loadingReducer,
        ServerErrorModel : serverErrorReducer,
        ServerSuccessModal : serverSuccessReducer,

    }
);