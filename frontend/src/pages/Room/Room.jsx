import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Title } from '../../components';
import { selectRooms, selectUser } from '../../selectors/';
import { setRooms } from '../../actions';
import { apiRequest } from '../../utils';

import styles from './Room.module.css';

export const Room = () => {
	const { id } = useParams();
	const [bookingFlag, setBookingFlag] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const room = useSelector(selectRooms);

	const user = useSelector(selectUser);

	useEffect(() => {
		const fetchRoom = async () => {
			try {
				const data = await apiRequest(`/rooms/${id}`);
				dispatch(setRooms(data));
			} catch (error) {
				console.error('Ошибка при загрузке номера: ', error);
			}
		};

		fetchRoom();
	}, [id, dispatch]);

	const handleBooking = async () => {
		if (!user) {
			navigate('/authorization');
			return;
		}

		try {
			await apiRequest('/bookings', 'POST', {
				roomId: room.id,
				roomTitle: room.title,
				roomPrice: room.price,
				userLogin: user,
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
