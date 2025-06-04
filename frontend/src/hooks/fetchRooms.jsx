import { fetchRoomsFailure, fetchRoomsRequest, fetchRoomsSuccess } from '../actions';
import { apiRequest } from '../utils';

export const fetchRooms = (hotelId) => async (dispatch) => {
	dispatch(fetchRoomsRequest());

	try {
		const data = await apiRequest(`/rooms?hotelId=${hotelId}`);
		dispatch(fetchRoomsSuccess(data));
	} catch (error) {
		dispatch(fetchRoomsFailure(error));
	}
};
