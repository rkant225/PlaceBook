import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './Redux/Store/store';
import App from './App';

console.log('ENV -> ', process.env.REACT_APP_ENV === 'production' ? 'PRODUCTION' : 'DEVELOPMENT');

if (process.env.NODE_ENV === 'production') {
    console.log = ()=>{};
}

ReactDOM.render( <Provider store={store}> <App/> </Provider>, document.getElementById('root') );
