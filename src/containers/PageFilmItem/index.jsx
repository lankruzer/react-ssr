import React, { useState, useContext, useEffect } from 'react';
import Header from './../../components/Header';
import Container from './../../components/Container';
import HeaderTop from './components/headerComponents/HeaderTop';
import HeaderContent from './components/headerComponents/HeaderContent';
import HeaderBottomLine from './components/headerComponents/HeaderBottomLine';
import FilmList from './../FilmList';
import { FilmsContext } from '../../contexts/FilmsContext';
import { FILMS_PER_CHUNK, SEARCH_TYPES } from '../../constants';

export default ({ match }) => {
    const [genre, setGenre] = useState('');
    const context = useContext(FilmsContext);
    const { updateFilmsList } = context;

    useEffect(() => {
        window.scrollTo(0, 0);
        if (genre) {
            updateFilmsList({
                offset: 0,
                limit: FILMS_PER_CHUNK,
                searchBy: SEARCH_TYPES.GENRE,
                search: genre,
            });
        }
    }, [genre]);

    const renderFilmList = () => {
        if (!genre) return null;
        return <FilmList />;
    };

    return (
        <>
            <Header
                renderTop={HeaderTop}
                renderContent={() => (
                    <HeaderContent
                        filmId={match.params.filmId}
                        setGenre={setGenre}
                    />
                )}
                renderBottomLine={() => <HeaderBottomLine genre={genre} />}
            />
            <Container>{renderFilmList()}</Container>
        </>
    );
};
