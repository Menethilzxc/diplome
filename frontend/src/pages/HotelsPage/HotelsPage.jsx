import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Title } from '../../components';
import { selectHotels, selectHotelsError, selectHotelsLoading } from '../../selectors';
import { fetchHotels } from '../../hooks';

import styles from './HotelsPage.module.css';

export const HotelsPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const hotels = useSelector(selectHotels) || [];
	const loading = useSelector(selectHotelsLoading);
	const error = useSelector(selectHotelsError);

	useEffect(() => {
		dispatch(fetchHotels());
	}, [dispatch]);

	const goToRoom = (id) => {
		navigate(`/hotels/${id}`);
	};

	if (loading) return <p>Загрузка отелей...</p>;
	if (error) return <p>Ошибка: {error}</p>;

	return (
		<div className={styles.container}>
			<Title>Доступные отели</Title>
			<div className={styles.cards}>
				{hotels.map((hotel) => (
					<div
						key={hotel._id}
						className={styles.card}
						onClick={() => goToRoom(hotel._id)}
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
