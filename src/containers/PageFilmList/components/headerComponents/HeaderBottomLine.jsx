import React, { useContext } from 'react';
import styles from './headerBottomLine.module.css';
import classNames from 'classnames';
import { SORT_BY_TYPES } from '../../../../constants';
import { FilmsContext } from '../../../../contexts/FilmsContext';
import Container from './../../../../components/Container';
import Loader from './../../../../components/Loader';

export default () => {
    const context = useContext(FilmsContext);
    const {
        isLoading,
        filmsList,
        currentRequestParams,
        updateFilmsList,
    } = context;

    const renderMoviesCount = () => {
        return (
            <Loader isLoading={isLoading} small dark widthAuto>
                {filmsList.total && `${filmsList.total}  movies found`}
            </Loader>
        );
    };

    const onChangeSortType = (event, type) => {
        event.preventDefault();

        updateFilmsList({
            sortBy: type,
            offset: 0,
        });
    };

    return (
        <div className={styles.bottom}>
            <Container>
                <div className={styles.bottomWrapper}>
                    {renderMoviesCount()}

                    <div>
                        <span className={styles.sortText}>Sort by:</span>
                        <a
                            className={classNames(styles.sortLink, {
                                [styles.active]:
                                    currentRequestParams.sortBy ===
                                    SORT_BY_TYPES.RELEASE_DATE,
                            })}
                            onClick={event =>
                                onChangeSortType(
                                    event,
                                    SORT_BY_TYPES.RELEASE_DATE
                                )
                            }
                        >
                            release date
                        </a>
                        <a
                            className={classNames(styles.sortLink, {
                                [styles.active]:
                                    currentRequestParams.sortBy ===
                                    SORT_BY_TYPES.RATING,
                            })}
                            onClick={event =>
                                onChangeSortType(event, SORT_BY_TYPES.RATING)
                            }
                        >
                            rating
                        </a>
                    </div>
                </div>
            </Container>
        </div>
    );
};
