import { ACTION_TYPE } from '../actions';

export const initialState = {
	isAuth: false,
	user: null,
	role: null,
};

export const authReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.LOGIN:
			return {
				...state,
				isAuth: true,
				user: payload.user,
				role: payload.role,
			};
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				isAuth: false,
				user: null,
				role: null,
			};
		default:
			return state;
	}
};
