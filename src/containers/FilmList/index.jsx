import React, { useContext, useEffect } from 'react';
import styles from './filmList.module.css';
import { FilmsContext } from '../../contexts/FilmsContext';
import classNames from 'classnames';
import { FILMS_PER_CHUNK } from '../../constants';
import FilmItem from './components/FilmItem';
import Loader from './../../components/Loader';

export default () => {
    const context = useContext(FilmsContext);
    const {
        isLoading,
        filmsList,
        updateFilmsList,
        currentRequestParams,
    } = context;

    useEffect(() => {
        updateFilmsList({
            offset: 0,
            limit: FILMS_PER_CHUNK,
        });
    }, []);

    const renderFilm = film => {
        return (
            <div key={film.id} className={styles.film}>
                <FilmItem {...film} />
            </div>
        );
    };

    const loadMore = () => {
        updateFilmsList({
            offset: currentRequestParams.offset + FILMS_PER_CHUNK,
            limit: FILMS_PER_CHUNK,
        });
    };

    const renderLoadMoreButton = () => {
        if (filmsList.offset + FILMS_PER_CHUNK > filmsList.total) {
            return null;
        }

        return (
            <div className={styles.buttonWrapper}>
                <button
                    className={classNames(styles.button, {
                        [styles.loading]: isLoading,
                    })}
                    onClick={loadMore}
                >
                    load more
                </button>
            </div>
        );
    };

    const renderFilms = () => {
        if (!filmsList) {
            return null;
        }

        if (!filmsList.data.length) {
            return <div className={styles.stub}>Films not found</div>;
        }

        if (filmsList.data) {
            return filmsList.data.map(renderFilm);
        }
    };

    return (
        <>
            <div className={styles.filmsWrapper}>
                <Loader
                    isLoading={isLoading && filmsList.data.length === 0}
                    dark
                >
                    {renderFilms()}
                </Loader>
            </div>
            {renderLoadMoreButton()}
        </>
    );
};
