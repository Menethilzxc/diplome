import { ACTION_TYPE } from './action-type';

export const setRooms = (dataRoom) => ({
	type: ACTION_TYPE.SET_ROOMS,
	payload: dataRoom,
});

export const fetchRoomsRequest = () => ({
	type: ACTION_TYPE.FETCH_ROOMS_REQUEST,
});

export const fetchRoomsSuccess = (rooms) => ({
	type: ACTION_TYPE.FETCH_ROOMS_SUCCESS,
	payload: rooms,
});

export const fetchRoomsFailure = (error) => ({
	type: ACTION_TYPE.FETCH_ROOMS_FAILURE,
	payload: error,
});
