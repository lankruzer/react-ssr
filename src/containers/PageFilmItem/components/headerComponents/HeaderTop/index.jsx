import React from 'react';
import { Link } from 'react-router-dom';
import styles from './headerTop.module.css';

export default () => (
    <div className={styles.linkWrapper}>
        <Link to="/" className={styles.link}>
            netflixroulette
        </Link>
        <Link to="/" className={styles.buttonSearch}>
            Search
        </Link>
    </div>
);
