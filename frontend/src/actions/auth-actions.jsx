import { ACTION_TYPE } from './action-type';
import { setBookings } from './set-bookings';

export const login = (user, role, token) => {
	localStorage.setItem('user', JSON.stringify(user));
	localStorage.setItem('role', role);
	localStorage.setItem('isAuth', 'true');
	localStorage.setItem('token', token);

	return {
		type: ACTION_TYPE.LOGIN,
		payload: { user, role, token },
	};
};

export const logout = () => (dispatch) => {
	localStorage.removeItem('user');
	localStorage.removeItem('role');
	localStorage.removeItem('isAuth');
	localStorage.removeItem('token');

	dispatch({ type: ACTION_TYPE.LOGOUT });
	dispatch(setBookings([]));
};
