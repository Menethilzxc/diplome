import { ACTION_TYPE } from '../actions';

const initialState = {
	rooms: [],
	loading: false,
	error: null,
};

export const roomsReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.SET_ROOMS:
			return { ...state, rooms: payload };

		case ACTION_TYPE.FETCH_ROOMS_REQUEST:
			return { ...state, loading: true, error: null };

		case ACTION_TYPE.FETCH_ROOMS_SUCCESS:
			return { ...state, rooms: payload, loading: false };

		case ACTION_TYPE.FETCH_ROOMS_FAILURE:
			return { ...state, loading: false, error: payload };

		case ACTION_TYPE.SET_ROOM_AVAILABLE:
			return {
				...state,
				rooms: state.rooms.map((room) =>
					room._id === payload._id ? payload : room,
				),
			};

		default:
			return state;
	}
};
