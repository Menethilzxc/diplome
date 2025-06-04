import { ACTION_TYPE } from '../actions';

const initialState = {
	bookings: [],
};

export const bookingsReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.SET_BOOKINGS:
			return { ...state, bookings: payload };

		default:
			return state;
	}
};
