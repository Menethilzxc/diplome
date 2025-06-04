import { fetchHotelsFailure, fetchHotelsRequest, fetchHotelsSuccess } from '../actions';

export const fetchHotels = () => async (dispatch) => {
	dispatch(fetchHotelsRequest());

	try {
		const res = await fetch('http://localhost:3001/hotels');
		const data = await res.json();
		dispatch(fetchHotelsSuccess(data));
	} catch (error) {
		console.error(fetchHotelsFailure(error.message));
	}
};
