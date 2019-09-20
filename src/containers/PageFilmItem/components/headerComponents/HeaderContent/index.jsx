import React, { useState, useEffect } from 'react';
import styles from './headerContent.module.css';
import { withRouter } from 'react-router';
import Loader from './../../../../../components/Loader';

const HeaderContent = ({ filmId, setGenre, history }) => {
    const [filmData, setFilmData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    let controller = new AbortController();

    const fetchFilmData = () => {
        setIsLoading(true);
        return fetch(process.env.API_URL + 'movies/' + filmId, {
            signal: controller.signal,
        })
            .then(response => response.json())
            .then(response => {
                if (Object.keys(response).length === 0) {
                    throw new Error('wrongFilmID');
                }

                setFilmData(response);
                setGenre(response.genres[0] || '');
            })
            .then(() => setIsLoading(false))
            .catch(error => {
                console.error(error);
                setIsLoading(false);

                if (error.message === 'wrongFilmID') {
                    return history.push({
                        pathname: '/404',
                    });
                }

                if (error.name === 'AbortError') {
                    console.error(error.name);
                }
            });
    };

    useEffect(() => {
        fetchFilmData();
    }, [filmId]);

    useEffect(() => {
        return () => {
            return controller.abort();
        };
    }, []);

    const renderFilmContent = () => {
        if (!filmData) {
            return null;
        }

        return (
            <>
                <div className={styles.posterWrapper}>
                    {filmData.poster_path && <img src={filmData.poster_path} />}
                </div>
                <div className={styles.contentWrapper}>
                    <div className={styles.titleWrapper}>
                        {filmData.title && (
                            <h1 className={styles.title}>{filmData.title}</h1>
                        )}
                        {filmData.vote_average !== 0 && (
                            <span className={styles.rating}>
                                {filmData.vote_average}
                            </span>
                        )}
                        {filmData.tagline && (
                            <h2 className={styles.tagline}>
                                {filmData.tagline}
                            </h2>
                        )}
                    </div>
                    <div className={styles.characteristics}>
                        {filmData.release_date && (
                            <span className={styles.year}>
                                {filmData.release_date.slice(0, 4)}
                            </span>
                        )}
                        {filmData.runtime && (
                            <span className={styles.runtime}>
                                {filmData.runtime} min
                            </span>
                        )}
                    </div>
                    {filmData.overview && (
                        <p className={styles.overview}>{filmData.overview}</p>
                    )}
                </div>
            </>
        );
    };

    return (
        <div className={styles.filmContent}>
            <Loader isLoading={isLoading}>{renderFilmContent()}</Loader>
        </div>
    );
};

export default withRouter(HeaderContent);
