import React from 'react';
import styles from './header.module.css';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div className={styles.linkWrapper}>
            <Link to="/" className={styles.link}>
                netflixroulette
            </Link>
        </div>
    );
};
