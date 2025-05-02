import styles from './Footer.module.css';

export const Footer = () => {
	return (
		<div className={styles.footer}>
			<div className={styles.title}>
				Бронирование <br />
				отелей
			</div>
			<div className={styles.contacts}>
				<a href="tel: +7-800-800-80-80">8-800-800-80-80</a>
				<br />
				<a href="mailto: mail@mail.ru">mail@mail.ru</a>
			</div>
		</div>
	);
};
