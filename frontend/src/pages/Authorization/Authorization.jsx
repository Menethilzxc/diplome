import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Title, Input } from '../../components';
import { ACTION_TYPE, login } from '../../actions';
import { selectRole } from '../../selectors';
import { apiRequest } from '../../utils';

import styles from './Authorization.module.css';

export const Authorization = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const role = useSelector(selectRole);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
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
			const loginData = await apiRequest('/auth/login', 'POST', {
				login: data.login,
				password: data.password,
			});

			const token = loginData.token;

			localStorage.setItem('token', token);

			const userData = await apiRequest('/auth/me');

			dispatch(login(userData, userData.role, token));

			navigate('/');
		} catch (error) {
			console.error('Ошибка при авторизации: ', error);
			setError('login', { message: 'Неверный логин или пароль' });
			setError('password', { message: '' });
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

				<Button className={styles.button} type="submit" disabled={!isValid}>
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
