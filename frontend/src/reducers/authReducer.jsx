import { ACTION_TYPE } from '../actions';

export const initialState = {
	isAuth: localStorage.getItem('isAuth') === 'true',
	user: (() => {
		try {
			const parsed = JSON.parse(localStorage.getItem('user'));
			return parsed || null;
		} catch (error) {
			console.error('Ошибка при парсинге: ', error);
			return null;
		}
	})(),
	role: localStorage.getItem('role') || null,
	token: localStorage.getItem('token') || null,
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
				token: payload.token,
			};
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				isAuth: false,
				user: null,
				role: null,
				token: null,
			};
		default:
			return state;
	}
};
