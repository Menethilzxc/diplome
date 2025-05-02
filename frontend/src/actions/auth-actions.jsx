import { ACTION_TYPE } from './action-type';

export const login = (user, role) => {
	localStorage.setItem('user', JSON.stringify(user));
	localStorage.setItem('role', role);
	localStorage.setItem('isAuth', true);

	return {
		type: ACTION_TYPE.LOGIN,
		payload: { user, role },
	};
};

export const logout = () => {
	localStorage.removeItem('user');
	localStorage.removeItem('role');
	localStorage.removeItem('isAuth');

	return {
		type: ACTION_TYPE.LOGOUT,
	};
};
