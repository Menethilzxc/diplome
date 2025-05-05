import { useEffect, useState } from 'react';
import { Title } from '../../components';

import styles from './Admin.module.css';

export const Admin = () => {
	const [rooms, setRooms] = useState([]);
	const [hotels, setHotels] = useState(null);

	console.log(hotels);

	useEffect(() => {
		const fetchRooms = async () => {
			try {
				const resRooms = await fetch('http://localhost:3001/rooms');
				const dataRooms = await resRooms.json();
				setRooms(dataRooms);
			} catch (error) {
				console.error('Ошибка при загрузке номеров: ', error);
			}
		};

		const fetchHotels = async () => {
			try {
				const resHotels = await fetch('http://localhost:3001/hotels');
				const dataHotels = await resHotels.json();
				setHotels(dataHotels);
			} catch (error) {
				console.error('Ошибка при загрузке отелей: ', error);
			}
		};

		fetchRooms();
		fetchHotels();
	}, []);

	if (!hotels) {
		return <div className={styles.loading}>Загрузка...</div>;
	}

	return (
		<div className={styles.container}>
			<Title>Панель администратора</Title>
			<div className={styles.hotelsList}>
				{hotels.map((hotel) => (
					<div key={hotel.id} className={styles.hotelCard}>
						<h4 className={styles.title}>{hotel.title}</h4>
						<div className={styles.roomsGrid}>
							{rooms
								.filter((room) => room.hotelId === hotel.id)
								.map((room) => (
									<div
										key={room.id}
										className={`${styles.roomBadge} ${room.available ? styles.available : styles.unavailable}`}
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
