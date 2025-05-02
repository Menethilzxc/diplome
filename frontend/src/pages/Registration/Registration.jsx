import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Title, Input } from '../../components';
import { ACTION_TYPE } from '../../actions';
import { selectRole } from '../../selectors';

import styles from './Registration.module.css';

export const Registration = () => {
	const {
		register,
		handleSubmit,
		watch,
		setError,
		formState: { errors },
	} = useForm();

	const [isRegistered, setIsRegistered] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const role = useSelector(selectRole);

	useEffect(() => {
		if (role !== null) {
			navigate('/');
		}
	}, [role, navigate]);

	const onSubmit = async (data) => {
		try {
			const checkRes = await fetch(
				`http://localhost:3001/users?login=${data.login}`,
			);
			const existingUsers = await checkRes.json();

			if (existingUsers.length > 0) {
				setError('login', { message: 'Такой логин уже существует' });

				return;
			}

			const newUser = {
				login: data.login,
				password: data.password,
				role: 1,
			};

			const res = await fetch('http://localhost:3001/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newUser),
			});

			const createdUser = await res.json();

			dispatch({
				type: ACTION_TYPE.LOGIN,
				payload: {
					user: createdUser.login,
					role: createdUser.role,
				},
			});

			localStorage.setItem(
				'user',
				JSON.stringify({ user: createdUser.login, role: createdUser.role }),
			);

			setIsRegistered(true);
		} catch (error) {
			console.error('Ошибка при регистрации: ', error);
		}
	};

	useEffect(() => {
		if (isRegistered) {
			const timer = setTimeout(() => {
				navigate('/');
			}, 2000);

			return () => clearInterval(timer);
		}
	}, [isRegistered, navigate]);

	const password = watch('password');

	return (
		<div className={styles.container}>
			{isRegistered ? (
				<p className={styles.success}>Регистрация прошла успешно!</p>
			) : (
				<>
					<Title className={styles.title}>Регистрация</Title>
					<form onSubmit={handleSubmit(onSubmit)} noValidate>
						<Input
							{...register('login', {
								required: 'Логин обязателен',
								pattern: {
									value: /^[a-zA-Z0-9]+$/,
									message: 'Только латинские буквы, цифры и "_"',
								},
							})}
							placeholder="Логин"
						/>
						{errors.login && (
							<p className={styles.error}>{errors.login.message}</p>
						)}
						<Input
							type="password"
							{...register('password', {
								required: 'Пароль обязателен',
								minLength: {
									value: 6,
									message: 'Пароль должен быть не менее 6 символов',
								},
							})}
							placeholder="Пароль"
						/>
						{errors.password && (
							<p className={styles.error}>{errors.password.message}</p>
						)}
						<Input
							type="password"
							{...register('confirmPassword', {
								required: 'Подтвердите пароль',
								validate: (value) =>
									value === password || 'Пароли не совпадают',
							})}
							placeholder="Подтвердите пароль"
						/>
						{errors.confirmPassword && (
							<p className={styles.error}>
								{errors.confirmPassword.message}
							</p>
						)}
						<Button
							className={styles.button}
							type="submit"
							disabled={
								!!(
									errors.login ||
									errors.password ||
									errors.confirmPassword
								)
							}
						>
							Зарегистрироваться
						</Button>
					</form>
				</>
			)}
		</div>
	);
};
