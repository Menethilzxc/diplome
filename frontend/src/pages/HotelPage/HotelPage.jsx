import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Title, Button } from '../../components';
import {
	selectHotel,
	selectHotelsError,
	selectHotelsLoading,
	selectRooms,
} from '../../selectors';
import { apiRequest } from '../../utils';
import { fetchHotel, fetchRooms } from '../../hooks';
import { fetchHotelSuccess, fetchRoomsSuccess, setRoomAvailable } from '../../actions';

import styles from './HotelPage.module.css';

export const HotelPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	const hotel = useSelector(selectHotel);
	const rooms = useSelector(selectRooms);
	const loading = useSelector(selectHotelsLoading);
	const error = useSelector(selectHotelsError);

	useEffect(() => {
		dispatch(fetchHotel(id));
		dispatch(fetchRooms(id));

		return () => {
			dispatch(fetchHotelSuccess(null));
			dispatch(fetchRoomsSuccess([]));
		};
	}, [id, dispatch]);

	if (loading) {
		return <div className={styles.loading}>Загрузка...</div>;
	}

	if (error) {
		return <div className={styles.error}>Ошибка загрузки отеля: {error}</div>;
	}

	if (!hotel) {
		return (
			<div className={styles.loading}>Отель не найден или ещё не загрузился...</div>
		);
	}

	const handleBookRoom = async (roomId) => {
		try {
			const room = rooms.find((r) => r._id === roomId);

			if (!room || !room.available) {
				throw new Error('Номер недоступен для бронирования');
			}

			const bookingRes = await apiRequest('/bookings', 'POST', {
				roomId: room._id,
				hotelId: hotel._id,
				hotel: hotel.title,
				number: room.number,
				roomTitle: room.title,
				price: room.price,
				bookingDate: new Date().toISOString(),
			});

			if (!bookingRes) {
				throw new Error('Ошибка при создании бронирования');
			}

			const updatedRoom = await apiRequest(`/rooms/${roomId}`);

			dispatch(setRoomAvailable(updatedRoom));
		} catch (error) {
			console.error('Ошибка при бронировании: ', error);
		}
	};

	return (
		<div className={styles.container}>
			<Title>Отель: {hotel.title} </Title>
			<div className={styles.wrapper}>
				<img src={hotel.image} alt={hotel.title} className={styles.image} />
				<div className={styles.description}>{hotel.description}</div>
			</div>
			<div className={styles.rooms}>
				<Title>Свободные номера:</Title>
				<div className={styles.roomsList}>
					{Array.isArray(rooms) ? (
						rooms.map((room) => (
							<div key={room._id} className={styles.roomCard}>
								<h4>
									{room.title} - {room.price} ₽
								</h4>

								<Button
									className={`${!room.available ? styles.booked : styles.bookingBtn}`}
									onClick={() => handleBookRoom(room._id)}
									disabled={!room.available}
								>
									Забронировать
								</Button>
							</div>
						))
					) : (
						<p>Загрузка номеров...</p>
					)}
				</div>
			</div>
		</div>
	);
};
