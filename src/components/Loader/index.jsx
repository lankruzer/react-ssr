import React from 'react';
import styles from './loader.module.css';
import classNames from 'classnames';

export default ({ isLoading, dark, small, widthAuto, children }) => {
    if (isLoading) {
        return (
            <div
                className={classNames(styles.loaderWrapper, {
                    [styles.widthAuto]: widthAuto,
                })}
            >
                <div
                    className={classNames(styles.loader, {
                        [styles.dark]: dark,
                        [styles.small]: small,
                    })}
                />
            </div>
        );
    }
    return children;
};
