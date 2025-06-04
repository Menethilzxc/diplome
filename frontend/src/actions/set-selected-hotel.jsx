import { ACTION_TYPE } from './action-type';

export const fetchHotelRequest = () => ({
	type: ACTION_TYPE.FETCH_HOTEL_REQUEST,
});

export const fetchHotelSuccess = (hotel) => ({
	type: ACTION_TYPE.FETCH_HOTEL_SUCCESS,
	payload: hotel,
});

export const fetchHotelFailure = (error) => ({
	type: ACTION_TYPE.FETCH_HOTEL_FAILURE,
	payload: error,
});
