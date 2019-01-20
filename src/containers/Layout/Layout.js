import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import classes from './Layout.module.css';
import Header from '../../components/Header/Header';
import MoviesList from '../MoviesList/MoviesList';
import TVList from '../TVList/TVList';
import PeopleList from '../PeopleList/PeopleList';

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <main className={classes.layout}>
                    <Route path="/" exact render={() => <Redirect to="/movie" />} />
                    <Route path="/movie" component={MoviesList} />
                    <Route path="/tv" component={TVList} />
                    <Route path="/people" component={PeopleList} />
                </main>
            </React.Fragment>
        );
    };
};

export default Layout;