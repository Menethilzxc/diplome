import styles from './Title.module.css';

export const Title = ({ children, className = '', size = '32px' }) => {
	return (
		<h2 className={`${styles.title} ${className}`} style={{ fontSize: size }}>
			{children}
		</h2>
	);
};
