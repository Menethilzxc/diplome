import { setBookings } from '../actions';
import { apiRequest } from '../utils';

export const fetchUserBookings = (userId) => async (dispatch) => {
	try {
		const data = await apiRequest(`/bookings/${userId}`);
		dispatch(setBookings(data));
	} catch (error) {
		console.error('Ошибка при загрузке бронирований: ', error);
	}
};
