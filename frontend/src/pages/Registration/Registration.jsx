import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Title, Input } from '../../components';
import { ACTION_TYPE, login } from '../../actions';
import { selectRole } from '../../selectors';

import styles from './Registration.module.css';
import { apiRequest } from '../../utils';

export const Registration = () => {
	const {
		register,
		handleSubmit,
		watch,
		setError,
		formState: { errors, isValid },
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
			const newUser = {
				login: data.login,
				password: data.password,
			};

			const res = await apiRequest('/auth/register', 'POST', newUser);

			dispatch(login({ login: data.login, role: 'user' }, 'user', res.token));

			localStorage.setItem(
				'user',
				JSON.stringify({ login: data.login, role: 'user' }),
			);

			localStorage.setItem('token', res.token);

			setIsRegistered(true);
		} catch (error) {
			if (error.message === 'Пользователь уже существует') {
				setError('login', { message: 'Такой логин уже существует' });
			} else {
				console.error('Ошибка при регистрации: ', error);
			}
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
							disabled={!isValid}
						>
							Зарегистрироваться
						</Button>
					</form>
				</>
			)}
		</div>
	);
};
