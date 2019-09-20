import React from 'react';
import Header from '../../components/Header';
import FilmList from '../FilmList';
import HeaderTop from './components/headerComponents/HeaderTop';
import HeaderContent from './components/headerComponents/HeaderContent';
import HeaderBottomLine from './components/headerComponents/HeaderBottomLine';
import Container from './../../components/Container';

export default ({ match }) => {
    const searchQuery = match.params.searchQuery
        ? match.params.searchQuery.trim()
        : null;

    return (
        <>
            <Header
                renderTop={HeaderTop}
                renderContent={() => (
                    <HeaderContent searchQuery={searchQuery} />
                )}
                renderBottomLine={HeaderBottomLine}
            />
            <main>
                <Container>
                    <FilmList />
                </Container>
            </main>
        </>
    );
};
