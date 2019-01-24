import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from '../../components/Loader/Loader';
import classes from './MoviesList.module.css';
import MoviesListItem from './MovieListItem/MovieListItem';
import Pagination from '../Pagination/Pagination';

import { fetchPopularMoviesInit } from '../../store/actions/index';

class MoviesList extends Component {

    constructor(props) {
        super(props);
        this.location = {...this.props.location};
        this.match = {...this.props.match};

        this.paginationType = this.props.match.params.type;
        this.page = Number(getPage(this.props.location.search));
    };

    componentDidMount() {
        let fetchMovies = this.props.movies.map((mov) => Number(Object.keys(mov)[0]));

        if (fetchMovies.indexOf(this.page) === -1) {
            this.props.fetchMovies(this.page);
        };
    };

    componentDidUpdate = () => { window.scrollTo(0, 0); }

    handleMovieClick = (id) => {
        let url = `${this.location.pathname}/${id}`;
        this.props.history.push(url)
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
                                    return <MoviesListItem
                                                key={mov.id}
                                                data={mov}
                                                movieClickHandler={() => this.handleMovieClick(mov.id)}/>
                                });

            movieList = (
                <div className={classes.movieContainer} ref={(ref) => this._div = ref} >
                    {movieListItems}
                </div>
            );
        };

        return (
            <div>
                {movieList}
                {
                    this.props.total_pages &&
                    <Pagination
                        currentPage={this.page}
                        pathName={this.location.pathname}
                        type={this.paginationType}
                        totalPages={this.props.total_pages} />
                }
            </div>
        );
    };
};

const mapStateToProps = (state, ownProps)=> {
    let {movies, loading, errors, current_page, total_pages} = state.movies.popular;
    let currentlyViewingPage = Number(getPage(ownProps.location.search));

    let currentPageMovies = movies.find((movie) => {
        let moviePage = Number(Object.keys(movie)[0]);

        if(moviePage === currentlyViewingPage) {
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

const getPage = (searchStr) => {
    const params = new URLSearchParams(searchStr);
    return params.get('page') || 1;
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
