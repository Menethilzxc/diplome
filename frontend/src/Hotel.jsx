import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
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
import { ACTION_TYPE } from './actions';

import styles from './Hotel.module.css';

function Hotel() {
	const dispatch = useDispatch();

	useEffect(() => {
		const storedUser = localStorage.getItem('user');

		if (storedUser) {
			const { user, role } = JSON.parse(storedUser);

			dispatch({
				type: ACTION_TYPE.LOGIN,
				payload: { user, role },
			});
		}
	}, [dispatch]);

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
