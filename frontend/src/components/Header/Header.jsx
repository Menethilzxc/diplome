import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { ROLES } from '../../constants/';
import { selectRole, selectUser } from '../../selectors';
import { logout } from '../../actions';

import logo from '../../assets/hotel-svgrepo-com.svg';
import styles from './Header.module.css';

export const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const role = useSelector(selectRole);
	const user = useSelector(selectUser);

	const handleLogout = () => {
		dispatch(logout());
		navigate('/');
	};

	return (
		<div className={styles.navContainer}>
			<div className={styles.leftWrapper}>
				<div className={styles.logo}>
					<Link to="/">
						<img src={logo} alt="Логотип" />
					</Link>
				</div>
				<div className={styles.about}>
					Бронирование <br /> отелей
				</div>
			</div>
			<div className={styles.rightWrapper}>
				{!user ? (
					<div className={styles.buttons}>
						<Link to="/authorization">
							<Button>Войти</Button>
						</Link>
					</div>
				) : (
					<div className={styles.logout}>
						<div className={styles.userName}>
							{user?.login ? user.login : '...'}
						</div>
						<Link>
							<Icon
								id="fa-sign-out"
								margin="15px 0 0 10px"
								onClick={handleLogout}
							></Icon>
						</Link>
					</div>
				)}
				<div className={styles.iconsContainer}>
					{role === ROLES.ADMIN && (
						<div className={styles.icons}>
							<Link to="/admin">
								<Icon id="fa-unlock-alt" margin="0 0 10px 10px"></Icon>
							</Link>
						</div>
					)}
					{(role === ROLES.ADMIN || role === ROLES.USER) && (
						<div className={styles.icons}>
							<Link to="/my-bookings">
								<Icon id="fa-user" margin="0 0 10px 10px" />
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
