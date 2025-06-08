import { fetchHotelsFailure, fetchHotelsRequest, fetchHotelsSuccess } from '../actions';

export const fetchHotels = () => async (dispatch) => {
	dispatch(fetchHotelsRequest());

	try {
		const res = await fetch('http://85.198.81.221:3008/hotels');
		const data = await res.json();
		dispatch(fetchHotelsSuccess(data));
	} catch (error) {
		console.error(fetchHotelsFailure(error.message));
	}
};
