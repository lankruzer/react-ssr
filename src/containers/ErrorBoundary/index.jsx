import React from 'react';
import styles from './errorBoundary.css';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className={styles.errorWrapper}>
                    <h1 className={styles.errorTitle}>
                        Something went wrong, please reload the page and try
                        again
                    </h1>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
