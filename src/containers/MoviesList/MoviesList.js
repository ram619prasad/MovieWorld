import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from '../../components/Loader/Loader';
import classes from './MoviesList.module.css';
import MoviesListItem from './MovieListItem/MovieListItem';
import Pagination from '../Pagination/Pagination';

import { fetchMoviesInit } from '../../store/actions/index';

class MoviesList extends Component {

    constructor(props) {
        super(props);
        this.page = Number(getPage(this.props.location.search));
        this.category = this.props.match.params.type;
    };

    componentDidMount() {
        let alreadyFetchedPages = this.props.movies.map(x =>  Number(Object.keys(x)[0]));

        if (alreadyFetchedPages.indexOf(this.page) === -1) {
            this.props.fetchMovies('popular', this.page);
        };

        window.scrollTo(0, 0);
    };

    handleMovieClick = (id) => {
        let url = `${this.props.location.pathname}/${id}`;
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
                        pathName={this.props.location.pathname}
                        type={this.props.match.params.type}
                        totalPages={this.props.total_pages} />
                }
            </div>
        );
    };
};

const mapStateToProps = (state, ownProps)=> {
    let category = ownProps.match.params.type;
    let {index, loading, errors, current_page, total_pages} = state.movies[category];
    let currentPage = Number(getPage(ownProps.location.search));

    let currentPageData = index.find((movie) => {
        let moviePage = Number(Object.keys(movie)[0]);
        if(moviePage === currentPage) {
            return movie;
        };
    });

    return {
        movies: index,
        currentPageMovies: currentPageData && Object.values(currentPageData)[0],
        loading: loading,
        errors: errors,
        current_page: current_page,
        total_pages: total_pages
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMovies: (category, page) => dispatch(fetchMoviesInit(category, page))
    };
};

const getPage = (searchStr) => {
    const params = new URLSearchParams(searchStr);
    return params.get('page') || 1;
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
