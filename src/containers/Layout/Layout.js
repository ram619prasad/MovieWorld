import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import classes from './Layout.module.css';
import Header from '../../components/Header/Header';
import MoviesList from '../MoviesList/MoviesList';
import TVList from '../TVList/TVList';
import PeopleList from '../PeopleList/PeopleList';
import MovieDetail from '../MovieDetail/MovieDetail';

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <main className={classes.layout}>
                    <Switch>
                        <Route path="/" exact render={() => <Redirect to="/movie/popular" />} />
                        <Route path="/movie/:type/:id" component={MovieDetail} />
                        <Route path="/movie/:type" render={(props) => {
                                                            const params = new URLSearchParams(props.location.search);
                                                            const page = params.get('page');
                                                            return <MoviesList key={page} {...props} />} }/>
                        <Route path="/tv/popular" component={TVList} />
                        <Route path="/people" component={PeopleList} />
                    </Switch>
                </main>
            </React.Fragment>
        );
    };
};

export default Layout;