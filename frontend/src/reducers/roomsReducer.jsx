import { ACTION_TYPE } from '../actions';

const initialState = [];

export const roomsReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.SET_ROOM_AVAILABLE:
			return state.map((room) =>
				room.id === action.payload ? { ...room, available: true } : room,
			);
		default:
			return state;
	}
};
