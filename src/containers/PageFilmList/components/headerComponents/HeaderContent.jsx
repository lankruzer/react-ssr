import React, { useContext, useEffect } from 'react';
import { FilmsContext } from '../../../../contexts/FilmsContext';
import styles from './header.module.css';
import classNames from 'classnames';
import { SEARCH_TYPES } from '../../../../constants';

export default ({ searchQuery }) => {
    const context = useContext(FilmsContext);
    const { currentRequestParams, updateParams, updateFilmsList } = context;
    const { search, searchBy } = currentRequestParams;

    useEffect(() => {
        const newSearch =
            searchQuery && search !== searchQuery ? searchQuery : search;

        updateFilmsList({
            offset: 0,
            search: newSearch,
        });
    }, []);

    const onFormSubmit = event => {
        if (event) {
            event.preventDefault();
        }

        updateFilmsList(
            {
                offset: 0,
            },
            true
        );
    };

    return (
        <div className={styles.formWrapper}>
            <form className={styles.form} onSubmit={onFormSubmit}>
                <label className={styles.label}>
                    <span className={styles.labelText}>Find your movie</span>
                    <input
                        type="text"
                        className={styles.input}
                        value={search}
                        onChange={event => {
                            updateParams({
                                search: event.target.value,
                            });
                        }}
                        placeholder="Enter text..."
                    />
                </label>
                <div className={styles.formBottom}>
                    <div className={styles.searchTypes}>
                        <span className={styles.searchText}>Search by:</span>
                        <button
                            className={classNames(styles.button, {
                                [styles.active]:
                                    searchBy === SEARCH_TYPES.TITLE,
                            })}
                            type="button"
                            onClick={() =>
                                updateParams({
                                    searchBy: SEARCH_TYPES.TITLE,
                                    search: '',
                                })
                            }
                        >
                            Title
                        </button>
                        <button
                            className={classNames(styles.button, {
                                [styles.active]:
                                    searchBy === SEARCH_TYPES.GENRE,
                            })}
                            type="button"
                            onClick={() =>
                                updateParams({
                                    searchBy: SEARCH_TYPES.GENRE,
                                    search: '',
                                })
                            }
                        >
                            Genre
                        </button>
                    </div>

                    <button
                        className={classNames(
                            styles.button,
                            styles.buttonSearch,
                            {
                                [styles.active]: !!search.trim().length,
                            }
                        )}
                        type="button"
                        onClick={() => onFormSubmit()}
                        disabled={!search.trim().length}
                    >
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
};
