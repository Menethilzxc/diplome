import { ACTION_TYPE } from '../actions';

const initialState = {
	hotels: [],
	selectedHotel: null,
	loading: false,
	error: null,
};

export const hotelsReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.FETCH_HOTELS_REQUEST:
			return { ...state, loading: true, error: null };

		case ACTION_TYPE.FETCH_HOTEL_REQUEST:
			return { ...state, loading: true, error: null };

		case ACTION_TYPE.FETCH_HOTELS_SUCCESS:
			return { ...state, hotels: payload, loading: false };

		case ACTION_TYPE.FETCH_HOTEL_SUCCESS:
			return { ...state, selectedHotel: payload, loading: false };

		case ACTION_TYPE.FETCH_HOTELS_FAILURE:
			return { ...state, loading: false, error: payload };

		case ACTION_TYPE.FETCH_HOTEL_FAILURE:
			return { ...state, loading: false, error: payload };

		default:
			return state;
	}
};
