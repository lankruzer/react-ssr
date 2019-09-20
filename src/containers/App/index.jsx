import React, { useEffect } from 'react';
import Footer from '../../components/Footer';
import styles from './app.module.css';
import FilmsContextHOC from '../../HOCs/FilmsContextHOC';
import ErrorBoundary from '../ErrorBoundary';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PageFilmList from './../PageFilmList';
import PageFilmItem from './../PageFilmItem';

export default () => {
    const PageNotFound = () => {
        return (
            <div>
                <h1>Page not found</h1>
            </div>
        );
    };

    return (
        <div className={styles.appContainer}>
            <ErrorBoundary>
                <Router>
                    <FilmsContextHOC>
                        <Switch>
                            <Route exact path="/" component={PageFilmList} />
                            <Route
                                exact
                                path="/search/:searchQuery"
                                component={PageFilmList}
                            />
                            <Route
                                exact
                                path="/film/:filmId"
                                component={PageFilmItem}
                            />
                            <Route component={PageNotFound} />
                        </Switch>
                    </FilmsContextHOC>
                    <Footer />
                </Router>
            </ErrorBoundary>
        </div>
    );
};
