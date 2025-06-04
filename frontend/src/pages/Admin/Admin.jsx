import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../components';
import { selectHotels, selectRole, selectRooms } from '../../selectors';
import { apiRequest } from '../../utils';
import { fetchHotelSuccess, setRoomAvailable, setRooms } from '../../actions';

import styles from './Admin.module.css';
import { fetchUserBookings } from '../../hooks';

export const Admin = () => {
	const [loadingRoomId, setLoadingRoomId] = useState(null);

	const hotels = useSelector(selectHotels);
	const role = useSelector(selectRole);
	const rooms = useSelector(selectRooms);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (role !== 'admin') {
			navigate('/');
		}

		const fetchRooms = async () => {
			try {
				const dataRooms = await apiRequest('/rooms');
				dispatch(setRooms(dataRooms));
			} catch (error) {
				console.error('Ошибка при загрузке номеров: ', error);
			}
		};

		const fetchHotels = async () => {
			try {
				const dataHotels = await apiRequest('/hotels');
				dispatch(fetchHotelSuccess(dataHotels));
			} catch (error) {
				console.error('Ошибка при загрузке отелей: ', error);
			}
		};

		fetchRooms();
		fetchHotels();
	}, [role, navigate, dispatch]);

	if (!hotels) {
		return <div className={styles.loading}>Загрузка...</div>;
	}

	const toggleRoomAvailability = async (roomId, currentStatus) => {
		setLoadingRoomId(roomId);
		try {
			const updatedRoom = await apiRequest(`/rooms/${roomId}`, 'PATCH', {
				available: !currentStatus,
			});

			if (!currentStatus) {
				try {
					const booking = await apiRequest(`/bookings/by-room/${roomId}`);
					if (booking?._id) {
						await apiRequest(`/bookings/by-room/${roomId}`, 'DELETE');
					}
				} catch (error) {
					if (error.response?.status !== 404) {
						console.error('Ошибка при удалении бронирования: ', error);
					}
				}
			}

			dispatch(setRoomAvailable(updatedRoom));
		} catch (error) {
			console.error('Ошибка при изменении статуса номера: ', error);
		} finally {
			setLoadingRoomId(null);
		}
	};

	return (
		<div className={styles.container}>
			<Title>Панель администратора</Title>
			<div className={styles.hotelsList}>
				{hotels.map((hotel) => (
					<div key={hotel._id} className={styles.hotelCard}>
						<h4 className={styles.title}>{hotel.title}</h4>
						Номера:
						<div className={styles.roomsGrid}>
							{rooms
								.filter((room) => room.hotelId === hotel._id)
								.map((room) => (
									<div
										key={room._id}
										onClick={() =>
											!loadingRoomId &&
											toggleRoomAvailability(
												room._id,
												room.available,
											)
										}
										className={`${styles.roomBadge} ${room.available ? styles.available : styles.unavailable} ${loadingRoomId === room._id ? styles.loading : ''}`}
									>
										{room.number}
									</div>
								))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
