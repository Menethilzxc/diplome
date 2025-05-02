import { useEffect, useState } from 'react';
import { Title } from '../../components';

import styles from './Admin.module.css';

export const Admin = () => {
	const [rooms, setRooms] = useState([]);

	useEffect(() => {
		const fetchRooms = async () => {
			try {
				const res = await fetch('http://localhost:3001/rooms');
				const data = await res.json();
				setRooms(data);
			} catch (error) {
				console.error('Ошибка при загрузке номеров: ', error);
			}
		};

		fetchRooms();
	}, []);

	return (
		<div className={styles.container}>
			<Title>Панель администратора</Title>
			<h4 className={styles.title}>Статусы номеров:</h4>
			<div className={styles.roomsList}>
				{rooms.map((room) => (
					<div key={room.id} className={styles.roomCard}>
						<p>
							<strong>Отель: </strong> {room.hotelId}
						</p>
						<p>
							<strong>Номер: </strong> {room.number} - {room.title}
						</p>
						<p>
							<strong>Цена: </strong> {room.price}
						</p>
						<p>
							<strong>Статус: </strong>{' '}
							<span
								className={
									room.available ? styles.available : styles.booked
								}
							>
								{room.available ? 'Доступен' : 'Забронирован'}
							</span>
						</p>
					</div>
				))}
			</div>
		</div>
	);
};
