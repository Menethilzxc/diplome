import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Title, Input } from '../../components';
import { ACTION_TYPE } from '../../actions';
import { selectRole } from '../../selectors';

import styles from './Authorization.module.css';

export const Authorization = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const role = useSelector(selectRole);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm();

	useEffect(() => {
		if (role !== null) {
			navigate('/');
		}
	}, [role, navigate]);

	const onSubmit = async (data) => {
		try {
			const res = await fetch(
				`http://localhost:3001/users?login=${data.login}&password=${data.password}`,
			);
			const users = await res.json();

			if (users.length > 0) {
				const user = users[0];
				dispatch({
					type: ACTION_TYPE.LOGIN,
					payload: {
						user: user.login,
						role: user.role,
					},
				});

				localStorage.setItem(
					'user',
					JSON.stringify({ user: user.login, role: user.role }),
				);

				navigate('/');
			} else {
				setError('login', { message: 'Неверный логин или пароль' });
				setError('password', { message: '' });
			}
		} catch (error) {
			console.error('Ошибка при авторизации: ', error);
		}
	};

	return (
		<div className={styles.container}>
			<Title className={styles.title}>Авторизация</Title>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					{...register('login', {
						required: 'Введите логин',
						onChange: () => clearErrors(['login', 'password']),
					})}
					placeholder="Введите логин"
				/>
				{errors.login && <p className={styles.error}>{errors.login.message}</p>}

				<Input
					type="password"
					{...register('password', {
						required: 'Введите пароль',
						onChange: () => clearErrors(['login', 'password']),
					})}
					placeholder="Введите пароль"
				/>
				{errors.password && (
					<p className={styles.error}>{errors.password.message}</p>
				)}

				<Button
					className={styles.button}
					type="submit"
					disabled={!!(errors.login || errors.password)}
				>
					Авторизоваться
				</Button>
				<div className={styles.buttonReg}>
					<Link to="/registration">
						<Button className={styles.button}>Регистрация</Button>
					</Link>
				</div>
			</form>
		</div>
	);
};
