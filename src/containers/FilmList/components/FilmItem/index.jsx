import React, { Fragment, useContext } from 'react';
import styles from './filmItem.module.css';
import { FilmsContext } from '../../../../contexts/FilmsContext';
import { FILMS_PER_CHUNK, SEARCH_TYPES } from '../../../../constants';
import { Link } from 'react-router-dom';

export default ({ id, genres, poster_path, release_date, title }) => {
    const { updateFilmsList, currentRequestParams } = useContext(FilmsContext);

    const genreHandleClick = (event, genre) => {
        event.stopPropagation();
        window.scrollTo(0, 0);
        return updateFilmsList({
            ...currentRequestParams,
            searchBy: SEARCH_TYPES.GENRE,
            search: genre,
            offset: 0,
            limit: FILMS_PER_CHUNK,
        });
    };

    const renderGenre = (genre, index) => {
        return (
            <Fragment key={genre}>
                <a
                    onClick={event => genreHandleClick(event, genre)}
                    className={styles.genreLink}
                >
                    {genre}
                </a>
                {index !== genres.length - 1 && <span>,&nbsp;</span>}
            </Fragment>
        );
    };

    return (
        <article
            className={styles.film}
            onClick={() => console.log('FILM CLICK')}
        >
            <Link to={`/film/${id}`} className={styles.posterWrapper}>
                <img src={poster_path} />
            </Link>
            <div className={styles.bottom}>
                <h2 className={styles.title}>
                    <Link to={`/film/${id}`}>{title}</Link>
                </h2>
                <div className={styles.date}>{release_date.slice(0, 4)}</div>
                <div className={styles.genres}>{genres.map(renderGenre)}</div>
            </div>
        </article>
    );
};
