import { forwardRef } from 'react';
import styles from './Input.module.css';

export const Input = forwardRef(({ className = '', ...props }, ref) => {
	return <input className={`${styles.input} ${className}`} {...props} ref={ref} />;
});
