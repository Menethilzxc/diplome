import styles from './Icon.module.css';

export const Icon = ({
	id,
	size = '22px',
	margin = '0',
	disabled = false,
	className = '',
	...props
}) => {
	const combinedClassName = [styles.icon, disabled ? styles.disabled : '', className]
		.join(' ')
		.trim();

	return (
		<div className={combinedClassName} style={{ fontSize: size, margin }} {...props}>
			<i className={`fa ${id}`} aria-hidden="true"></i>
		</div>
	);
};
