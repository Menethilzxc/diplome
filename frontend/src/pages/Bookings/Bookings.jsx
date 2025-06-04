import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectBookings, selectUser } from '../../selectors';
import { Title, Button } from '../../components';
import { setBookings, setRoomAvailable } from '../../actions';
import { apiRequest, formatDate } from '../../utils';

import styles from './Bookings.module.css';
import { fetchUserBookings } from '../../hooks';

export const Bookings = () => {
	const bookings = useSelector(selectBookings);
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user?._id) {
			dispatch(fetchUserBookings(user._id));
		}
	}, [user._id, dispatch, bookings.length]);

	const handleDelete = async (bookingId, roomId) => {
		try {
			await apiRequest(`/bookings/${bookingId}`, 'DELETE');

			dispatch(fetchUserBookings(user._id));

			dispatch(setRoomAvailable({ id: roomId, available: true }));
		} catch (error) {
			console.error('Ошибка при удалении брони: ', error);
		}
	};

	return (
		<div className={styles.container}>
			<Title>Ваши бронирования, {user?.login ? user.login : '...'}</Title>
			{bookings.length === 0 ? (
				<p className={styles.noBooking}>У вас нет активных бронирований</p>
			) : (
				<div className={styles.bookingsList}>
					{bookings.map((item) => (
						<li key={item._id} className={styles.list}>
							<Link
								to={`/hotels/${item.hotelId._id}`}
								className={styles.link}
							>
								<p className={styles.bookingInfo}>
									Отель: "{item.hotelId.title}"
								</p>
								<p className={styles.bookingInfo}>
									Номер: {item.roomId.number} - "{item.roomId.title}"
								</p>
								<p className={styles.bookingInfo}>
									Цена: {item.roomId.price} ₽
								</p>
								<p className={styles.bookingInfo}>
									Дата бронирования: {formatDate(item.bookingDate)}
								</p>
							</Link>
							<Button
								className={styles.deleteBtn}
								onClick={() => handleDelete(item._id, item.roomId._id)}
							>
								Отменить
							</Button>
						</li>
					))}
				</div>
			)}
		</div>
	);
};
