import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from '../../components/Loader/Loader';
import classes from './MoviesList.module.css';
import MoviesListItem from './MovieListItem/MovieListItem';
import { fetchPopularMoviesInit } from '../../store/actions/index';

class MoviesList extends Component {
    componentDidMount() {
        let page = this.props.match.params.id;
        let fetchMovies = this.props.movies.map((mov) => Object.keys(mov)[0]);

        if (fetchMovies.indexOf(page) === -1) {
            this.props.fetchMovies(page);
        }
    }

    render() {
        let movieList = <Loader/>;

        if (this.props.errors) {
            movieList = (
                <div className={classes.errorContainer}>
                    <p>Fetching failed. Please check your connection and try again.</p>
                </div>
            );
        };

        if (this.props.currentPageMovies) {
            let movieListItems = this.props.currentPageMovies.map((mov) => {
                                    return <MoviesListItem key={mov.id} data={mov}/>
                                });

            movieList = (
                <div className={classes.movieContainer}>
                    {movieListItems}
                </div>
            );
        };

        return movieList;
    };
};

const mapStateToProps = (state, ownProps)=> {
    let {movies, loading, errors, current_page, total_pages} = state.movies.popular;

    let currentPageMovies = movies.find((movie) => {
        let moviePage = Object.keys(movie)[0];
        if(moviePage === ownProps.match.params.id) {
            return movie;
        };
    });

    return {
        movies: movies,
        currentPageMovies: currentPageMovies && Object.values(currentPageMovies)[0],
        loading: loading,
        errors: errors,
        current_page: current_page,
        total_pages: total_pages
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMovies: (page) => dispatch(fetchPopularMoviesInit(page))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
