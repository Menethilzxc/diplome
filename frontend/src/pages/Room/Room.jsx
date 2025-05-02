import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Title } from '../../components';
import { selectUser } from '../../selectors/';

import styles from './Room.module.css';

export const Room = () => {
	const { id } = useParams();
	const [room, setRoom] = useState(null);
	const [bookingFlag, setBookingFlag] = useState(false);
	const navigate = useNavigate();

	const user = useSelector(selectUser);

	useEffect(() => {
		const fetchRoom = async () => {
			try {
				const res = await fetch(`http://localhost:3001/rooms/${id}`);
				const data = await res.json();
				setRoom(data);
			} catch (error) {
				console.error('Ошибка при загрузке номера: ', error);
			}
		};

		fetchRoom();
	}, [id]);

	const handleBooking = async () => {
		if (!user) {
			navigate('/authorization');
			return;
		}

		try {
			await fetch('http://localhost:3001/bookings', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					roomId: room.id,
					roomTitle: room.title,
					roomPrice: room.price,
					userLogin: user,
				}),
			});
			setBookingFlag(true);

			setTimeout(() => {
				setBookingFlag(false);
			}, 2500);
		} catch (error) {
			console.error('Ошибка при бронировании: ', error);
		}
	};

	if (!room) {
		return <p className={styles.loading}>Загрузка...</p>;
	}

	const successfullBooking = (
		<p className={styles.success}>Номер успешно забронирован!</p>
	);

	return (
		<div className={styles.container}>
			<div className={styles.about}>
				<Title className={styles.title}>{room.title}</Title>
				<img src={room.image} alt="" />
				<div className={styles.buttons}>
					<p className={styles.price}>
						<strong>Цена: </strong> {room.price} ₽
					</p>
					<Button onClick={handleBooking} className={styles.button}>
						Забронировать
					</Button>
					{bookingFlag ? successfullBooking : ''}
				</div>
			</div>
			<div className={styles.roomInfo}>
				<p>{room.description}</p>
			</div>
		</div>
	);
};
