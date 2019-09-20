import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { FilmsContext } from '../contexts/FilmsContext';
import { FILMS_PER_CHUNK, SEARCH_TYPES, SORT_BY_TYPES } from '../constants';

const initFilmsList = {
    data: [],
    offset: 0,
    limit: FILMS_PER_CHUNK,
    total: 0,
};

const initParams = {
    offset: 0,
    limit: FILMS_PER_CHUNK,
    sortBy: SORT_BY_TYPES.RELEASE_DATE,
    sortOrder: 'desc',
    search: '',
    searchBy: SEARCH_TYPES.TITLE,
};

const FilmContextHOC = ({ location, match, history, children }) => {
    const [filmsList, setFilmsList] = useState(initFilmsList);
    const [isLoading, setIsLoading] = useState(false);
    const [params, setParams] = useState(initParams);

    let controller = new AbortController();

    const updateParams = newParams => {
        return setParams({
            ...params,
            ...newParams,
        });
    };

    const doRedirect = (needRedirect, redirectParams) => {
        if (!needRedirect) return;

        if (redirectParams.length === 0) {
            return history.push('/');
        }

        return history.push(`/search/${redirectParams}`);
    };

    const updateFilmsList = (newParams, redirect) => {
        const currentParams = {
            ...params,
            ...newParams,
        };

        const requestParams = new URLSearchParams(currentParams);
        const redirectParams = encodeURIComponent(currentParams.search.trim());

        doRedirect(redirect, redirectParams);

        setIsLoading(true);
        updateParams(currentParams);

        try {
            return fetch(process.env.API_URL + 'movies?' + requestParams, {
                signal: controller.signal,
            })
                .then(response => response.json())
                .then(response => {
                    console.log('response = ', response);
                    if (currentParams.offset) {
                        return setFilmsList({
                            ...filmsList,
                            ...response,
                            data: [...filmsList.data, ...response.data],
                        });
                    }

                    return setFilmsList(response);
                })
                .then(() => setIsLoading(false))
                .catch(error => {
                    if (error.name === 'AbortError') {
                        setFilmsList(initFilmsList);
                        setParams(initParams);
                    }
                    setIsLoading(false);
                });
        } catch (error) {
            console.log(error.name);
            console.log(error.message);
            console.log(' ');
            console.log(' ');
        }
    };

    useEffect(() => {
        if (!location.pathname.startsWith('/search/')) return;

        console.log('location.pathname.length = ', location.pathname.length);

        if (location.pathname.length > 8) return;

        console.log('kdsajlksajdklsj');

        history.push('/');
    }, []);

    return (
        <FilmsContext.Provider
            value={{
                abort: controller.abort,
                filmsList,
                isLoading,
                currentRequestParams: { ...params },
                updateParams,
                updateFilmsList,
            }}
        >
            {children}
        </FilmsContext.Provider>
    );
};

export default withRouter(FilmContextHOC);
