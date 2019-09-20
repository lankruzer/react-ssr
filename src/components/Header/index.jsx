import React from 'react';
import styles from './header.module.css';
import Container from './../Container';

export default ({ renderTop, renderContent, renderBottomLine }) => (
    <header className={styles.header}>
        <Container>
            {renderTop && renderTop()}
            {renderContent && renderContent()}
        </Container>
        {renderBottomLine && renderBottomLine()}
    </header>
);
