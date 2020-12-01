import {connect, Provider} from 'react-redux';
import { Box, CssBaseline } from '@material-ui/core';
import Home from './Components/home';
import {BrowserRouter, Redirect, Route, Router, Switch} from 'react-router-dom'
import history from './router/history';
import ProtectedRoute from './router/protectedRoute';
import {startLoading, stopLoading} from './Redux/Actions/loadingActions';
import React, { Suspense, useEffect } from 'react';

// import Places from './Components/places';
// import AllPlaces from './Components/places/allPlaces';
// import Header from './Components/header/header';
// import Login from './Components/login';
// import LogOut from './Components/logOut';
// import AddOrEditPlace from './Components/addOrEditPlace';
// import Loader from './Components/SharedComponents/loader';
// import RenderSuccessMessage from './Components/SharedComponents/renderSuccessMessage';
// import RenderErrorMessage from './Components/SharedComponents/renderErrorMessage';
// import Authenticator from './Components/authenticator/authenticator';
// import SessionTimeOutModal from './Components/SharedComponents/sessionTimeOutModal';


//-----------LAZY LOADING-------
const Places = React.lazy(()=>import('./Components/places'));
const AllPlaces = React.lazy(()=>import('./Components/places/allPlaces'));
const Header = React.lazy(()=>import('./Components/header/header'));
const Login = React.lazy(()=>import('./Components/login'));
const LogOut = React.lazy(()=>import('./Components/logOut'));
const AddOrEditPlace = React.lazy(()=>import('./Components/addOrEditPlace'));
const Loader = React.lazy(()=>import('./Components/SharedComponents/loader'));
const RenderSuccessMessage = React.lazy(()=>import('./Components/SharedComponents/renderSuccessMessage'));
const RenderErrorMessage = React.lazy(()=>import('./Components/SharedComponents/renderErrorMessage'));
const Authenticator = React.lazy(()=>import('./Components/authenticator/authenticator'));
const SessionTimeOutModal = React.lazy(()=>import('./Components/SharedComponents/sessionTimeOutModal'));
//-----------LAZY LOADING-------

function App(props) {
  const {dispatch} = props;

  useEffect(()=>{
    stopLoading(dispatch);
  },[]);

  return (
    <div className="App">
      
        <CssBaseline>
          <Suspense fallback>
            <Loader>
              <RenderSuccessMessage>
                <RenderErrorMessage>

                  <Router history={history}>

                    <Authenticator/>
                    <SessionTimeOutModal/>

                    <Header/>
                    <Box style={{paddingLeft : '1rem', paddingRight : '1rem'}} >
                      <Switch>
                        <Route path="/" exact component={(props)=><Home {...props}/>}/>
                        <Route path="/home" component={(props)=><Home {...props}/>}/>
                        <Route path="/all-places" component={(props)=><AllPlaces {...props}/>}/>
                        <ProtectedRoute path="/add-place/" component={AddOrEditPlace}/>
                        <ProtectedRoute path="/edit-place/:placeId" component={AddOrEditPlace}/>
                        <Route path="/places/:userId" component={(props)=><Places {...props}/>}/>
                        <Route path="/login" component={(props)=><Login {...props}/>}/>
                        <Route path="/logout" component={(props)=><LogOut {...props}/>}/>
                        {/* <Redirect to="/"/> */}
                      </Switch>
                    </Box>
                    
                  </Router>

                </RenderErrorMessage>
              </RenderSuccessMessage>
            </Loader>
          </Suspense>
        </CssBaseline>
    </div>
  );
}

const mapStateToProps =(state)=>{
  return{ }
}

const mapDispatchToProps = (dispatch)=>{
  return {
      dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
