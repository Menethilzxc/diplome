import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Header, Footer } from './components';
import {
	Authorization,
	Registration,
	Room,
	Admin,
	Bookings,
	HotelsPage,
	HotelPage,
} from './pages';
import { login } from './actions';
import { apiRequest } from './utils';

import styles from './Hotel.module.css';

function Hotel() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const checkAuth = async () => {
			const token = localStorage.getItem('token');

			if (!token) return;

			try {
				const data = await apiRequest('/auth/me');
				dispatch(login(data, data.role, token));
			} catch (error) {
				console.error('Ошибка при проверке авторизации: ', error.message);
				localStorage.removeItem('token');
				navigate('/authorization');
			}
		};

		checkAuth();
	}, [dispatch, navigate]);

	return (
		<div className={styles.container}>
			<Header />
			<Routes>
				<Route path="/" element={<HotelsPage />} />
				<Route path="/authorization" element={<Authorization />} />
				<Route path="/registration" element={<Registration />} />
				<Route path="/hotels/:id" element={<HotelPage />} />
				<Route path="/room/:id" element={<Room />} />
				<Route path="/my-bookings" element={<Bookings />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="*" element={<div>Ошибка</div>} />
			</Routes>
			<Footer />
		</div>
	);
}

export default Hotel;
