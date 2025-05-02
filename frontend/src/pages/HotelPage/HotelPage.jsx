import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Title, Button } from '../../components';
import { selectUser } from '../../selectors';

import styles from './HotelPage.module.css';

export const HotelPage = () => {
	const { id } = useParams();
	const [hotel, setHotel] = useState(null);
	const [rooms, setRooms] = useState([]);

	const user = useSelector(selectUser);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchHotelAndRooms = async () => {
			try {
				const [hotelRes, roomsRes] = await Promise.all([
					fetch(`http://localhost:3001/hotels/${id}`),
					fetch(`http://localhost:3001/rooms?hotelId=${id}`),
				]);

				const hotelData = await hotelRes.json();
				const roomsData = await roomsRes.json();

				setHotel(hotelData);
				setRooms(roomsData);
			} catch (error) {
				console.error('Ошибка при загрузке: ', error);
			}
		};
		fetchHotelAndRooms();
	}, [id]);

	if (!hotel) {
		return <div className={styles.loading}>Загрузка...</div>;
	}

	const handleBookRoom = async (roomId) => {
		try {
			const room = rooms.find((r) => r.id === roomId);

			const updateRoomRes = await fetch(`http://localhost:3001/rooms/${roomId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ available: false }),
			});

			if (!updateRoomRes.ok) {
				throw new Error('Ошибка при обновлении комнаты');
			}

			const bookingRes = await fetch('http://localhost:3001/bookings', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					roomId: roomId,
					hotelId: hotel.id,
					hotel: hotel.title,
					number: room.number,
					roomTitle: room.title,
					price: room.price,
					userLogin: user.login,
					bookingDate: new Date().toLocaleString(),
				}),
			});

			if (!bookingRes) {
				throw new Error('Ошибка при создании бронирования');
			}

			if (updateRoomRes.ok) {
				setRooms((prevRooms) =>
					prevRooms.map((room) =>
						room.id === roomId ? { ...room, available: false } : room,
					),
				);
			} else {
				console.error('Ошибка при бронировании');
			}
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
					{rooms.map((room) => (
						<div key={room.id} className={styles.roomCard}>
							<h4>
								{room.title} - {room.price} ₽
							</h4>

							<Button
								className={`${!room.available ? styles.booked : styles.bookingBtn}`}
								onClick={() => handleBookRoom(room.id)}
								disabled={!room.available}
							>
								Забронировать
							</Button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
