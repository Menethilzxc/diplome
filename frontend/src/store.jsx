import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { authReducer, roomsReducer } from './reducers';
import { thunk } from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
	auth: authReducer,
	rooms: roomsReducer,
});

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
