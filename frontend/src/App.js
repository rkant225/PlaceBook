import {connect, Provider} from 'react-redux';
import { Box, CssBaseline } from '@material-ui/core';
import Home from './Components/home';
import {BrowserRouter, Redirect, Route, Router, Switch} from 'react-router-dom'
import history from './router/history';
import ProtectedRoute from './router/protectedRoute';
import Places from './Components/places';
import Header from './Components/header/header';
import Login from './Components/login';
import LogOut from './Components/logOut';
import AddOrEditPlace from './Components/addOrEditPlace';
import Loader from './Components/SharedComponents/loader';
import RenderSuccessMessage from './Components/SharedComponents/renderSuccessMessage';
import RenderErrorMessage from './Components/SharedComponents/renderErrorMessage';

import {startLoading, stopLoading} from './Redux/Actions/loadingActions';
import { useEffect } from 'react';


function App(props) {
  const {dispatch} = props;

  useEffect(()=>{
    stopLoading(dispatch);
  },[]);

  return (
    <div className="App">
      
        <CssBaseline>
          <Loader>
            <RenderSuccessMessage>
              <RenderErrorMessage>

                <Router history={history}>
                  <Header/>

                  <Box style={{paddingLeft : '1rem', paddingRight : '1rem'}} >
                    <Switch>
                      <Route path="/" exact component={(props)=><Home {...props}/>}/>
                      <Route path="/home" component={(props)=><Home {...props}/>}/>
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
