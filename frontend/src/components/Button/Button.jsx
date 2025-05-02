import styles from './Button.module.css';

export const Button = ({
	children,
	onClick,
	type = 'button',
	className = '',
	disabled = false,
}) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`${styles.button} ${className}`}
			disabled={disabled}
		>
			{children}
		</button>
	);
};
