import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../selectors';
import { Title, Button } from '../../components';
import { ACTION_TYPE } from '../../actions';
import { setRoomAvailable } from '../../actions';

import styles from './Bookings.module.css';

export const Bookings = () => {
	const [booking, setBooking] = useState([]);
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const res = await fetch(
					`http://localhost:3001/bookings?userLogin=${user}`,
				);
				const data = await res.json();
				setBooking(data);
			} catch (error) {
				console.error('Ошибка при загрузке бронирований: ', error);
			}
		};

		if (user) {
			fetchBookings();
		}
	}, [user]);

	const handleDelete = async (bookingId, roomId) => {
		try {
			await fetch(`http://localhost:3001/bookings/${bookingId}`, {
				method: 'DELETE',
			});

			await fetch(`http://localhost:3001/rooms/${roomId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'aplication/json',
				},
				body: JSON.stringify({ available: true }),
			});

			setBooking((prev) => prev.filter((booking) => booking.id !== bookingId));
			dispatch(setRoomAvailable(roomId));
		} catch (error) {
			console.error('Ошибка при удалении брони: ', error);
		}
	};

	return (
		<div className={styles.container}>
			<Title>Ваши бронирования, {user}</Title>
			{booking.length === 0 ? (
				<p className={styles.noBooking}>У вас нет активных бронирований</p>
			) : (
				<div className={styles.bookingsList}>
					{booking.map((item) => (
						<li key={item.id} className={styles.list}>
							<Link to={`/hotels/${item.hotelId}`} className={styles.link}>
								<p className={styles.bookingInfo}>
									Отель: "{item.hotel}"
								</p>
								<p className={styles.bookingInfo}>
									Номер: {item.number} - "{item.roomTitle}"
								</p>
								<p className={styles.bookingInfo}>Цена: {item.price} ₽</p>
								<p className={styles.bookingInfo}>
									Дата бронирования: {item.bookingDate}
								</p>
							</Link>
							<Button
								className={styles.deleteBtn}
								onClick={() => handleDelete(item.id, item.roomId)}
							>
								Удалить
							</Button>
						</li>
					))}
				</div>
			)}
		</div>
	);
};
