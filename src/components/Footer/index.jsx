import React from 'react';
import styles from './footer.module.css';
import { Link } from 'react-router-dom';
import Container from './../Container';

export default (function() {
    return (
        <footer className={styles.footer}>
            <Container>
                <Link className={styles.link} to="/">
                    netflixroulette
                </Link>
            </Container>
        </footer>
    );
});
