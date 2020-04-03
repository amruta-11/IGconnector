import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index'


const middleware = [thunk];

const store = createStore(
rootReducer, 
{},
//Enhancement to the data - the current data must be spread(...) and after that broken into thunks
//Compose is to see the store because browsers don't allow
compose(
applyMiddleware(...middleware),
window.__REDUX_DEVTOOLS_EXTENSION__
? window.__REDUX_DEVTOOLS_EXTENSION__()
: f => f
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));


export default store;
