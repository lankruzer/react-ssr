import React from 'react';
import styles from './headerBottomLine.module.css';
import Container from './../../../../../components/Container';

export default ({ genre }) => {
    return (
        <div className={styles.bottom}>
            <Container>
                <div className={styles.bottomWrapper}>
                    {genre && `Films by ${genre} genre`}
                </div>
            </Container>
        </div>
    );
};
