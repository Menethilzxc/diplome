import { fetchHotelRequest, fetchHotelSuccess, fetchHotelFailure } from '../actions';
import { apiRequest } from '../utils';

export const fetchHotel = (id) => async (dispatch) => {
	dispatch(fetchHotelRequest());

	try {
		const data = await apiRequest(`/hotels/${id}`);

		dispatch(fetchHotelSuccess(data));
	} catch (error) {
		dispatch(fetchHotelFailure(error.message));
	}
};
