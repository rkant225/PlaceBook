import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../Reducer/index';
import thunk from 'redux-thunk'

const middleWares = [thunk];

// Saving store to local storage
function saveToLocalStorage(state){
    try{
        const serializedState = JSON.stringify(state)
        sessionStorage.setItem('store',serializedState)
    }
    catch(err){
        console.log(err)
    }
}

// loading from local storage
function loadStoreFromStorage(){
    try{
        const serializedState = sessionStorage.getItem('store')
        if (serializedState == null) return undefined
        return JSON.parse(serializedState)
    }catch(err){
        return undefined
    }
}

const composeEnhancer =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedStore = loadStoreFromStorage()
const store = createStore(rootReducer, persistedStore, composeEnhancer(applyMiddleware(...middleWares)))

// This makes sure that our redux state is saved local storage, whenever there is change in store (on Action trigger).
store.subscribe(()=>{ saveToLocalStorage(store.getState())})

export default store;