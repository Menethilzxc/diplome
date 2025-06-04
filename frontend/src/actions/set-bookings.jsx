import { ACTION_TYPE } from './action-type';

export const setBookings = (data) => ({
	type: ACTION_TYPE.SET_BOOKINGS,
	payload: data,
});
