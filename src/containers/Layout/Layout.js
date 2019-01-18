import React, { Component } from 'react';

import Header from '../../components/Header/Header';
import MoviesList from '../MoviesList/MoviesList';

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <main>
                    <MoviesList />
                </main>
            </React.Fragment>
        );
    };
};

export default Layout;