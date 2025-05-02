import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../components';

import styles from './HotelsPage.module.css';

export const HotelsPage = () => {
	const [hotels, setHotels] = useState([]);
	const navigate = useNavigate();
	console.log(hotels);
	useEffect(() => {
		const fetchRooms = async () => {
			try {
				const res = await fetch('http://localhost:3001/hotels');
				const data = await res.json();
				setHotels(data);
			} catch (error) {
				console.error('Ошибка при загрузке номеров: ', error);
			}
		};

		fetchRooms();
	}, []);

	const goToRoom = (id) => {
		navigate(`/hotels/${id}`);
	};

	return (
		<div className={styles.container}>
			<Title>Доступные номера</Title>
			<div className={styles.cards}>
				{hotels.map((hotel) => (
					<div
						key={hotel.id}
						className={styles.card}
						onClick={() => goToRoom(hotel.id)}
					>
						<img
							src={hotel.image}
							alt={hotel.title}
							className={styles.hotelsImg}
						/>
						<h3>{hotel.title}</h3>
						<p className={styles.paragraph}>{hotel.description}</p>
					</div>
				))}
			</div>
		</div>
	);
};
