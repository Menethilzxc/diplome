import { ACTION_TYPE } from './action-type';

export const fetchHotelsRequest = () => ({
	type: ACTION_TYPE.FETCH_HOTELS_REQUEST,
});

export const fetchHotelsSuccess = (hotels) => ({
	type: ACTION_TYPE.FETCH_HOTELS_SUCCESS,
	payload: hotels,
});

export const fetchHotelsFailure = (error) => ({
	type: ACTION_TYPE.FETCH_HOTELS_FAILURE,
	payload: error,
});
