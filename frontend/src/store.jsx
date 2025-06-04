import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { authReducer, roomsReducer, hotelsReducer, bookingsReducer } from './reducers';
import { thunk } from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
	auth: authReducer,
	rooms: roomsReducer,
	hotels: hotelsReducer,
	bookings: bookingsReducer,
});

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
