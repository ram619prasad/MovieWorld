import axios from '../../axiosInstances/movieInstance';

import { 
    FETCH_MOVIES_STARTED,
    FETCH_MOVIES_COMPLETED,
    FETCH_MOVIES_FAILED,
    FETCH_DETAILED_MOVIE_STARTED,
    FETCH_DETAILED_MOVIE_FAILED,
    FETCH_DETAILED_MOVIE_COMPLETED
} from './actionTypes';

export const fetchMoviesStarted = () => {
    return {
        type: FETCH_MOVIES_STARTED
    };
};

export const fetchMoviesFailed = (error) => {
    return {
        type: FETCH_MOVIES_FAILED,
        error: error
    };
};

export const fetchMoviesCompleted = (movies, current_page, total_pages) => {
    return {
        type: FETCH_MOVIES_COMPLETED,
        movies: movies,
        current_page: current_page,
        total_pages: total_pages
    };
};

export const fetchPopularMoviesInit = (pageNo) => {
    return dispatch => {
        dispatch(fetchMoviesStarted());
        let page = pageNo || 1;
        axios.get('/popular', { params: { page: page } })
            .then(res => {
                let popularMovies = res.data.results.map((mov) => {
                    return { 
                        ...mov,
                        poster_path: process.env.REACT_APP_API_POSTER_BASE_URL_MEDIUM + mov.poster_path
                    };
                });

                let{page, total_pages} = res.data;
                let movies = {[page]: popularMovies};
                dispatch(fetchMoviesCompleted(movies, page, total_pages));
            })
            .catch(err => {
                dispatch(fetchMoviesFailed('Fetching movies failed'));
            });
    };
};

export const fetchDetailedMovieStarted = () => {
    return {
        type: FETCH_DETAILED_MOVIE_STARTED
    };
};

export const fetchDetailedMovieFailed = (error) => {
    return {
        type: FETCH_DETAILED_MOVIE_FAILED,
        error: error
    };
};

export const fetchDetailedMovieCompleted = (movie) => {
    return {
        type: FETCH_DETAILED_MOVIE_COMPLETED,
        movie: movie,
    };
};

export const fetchDetailedMoviesInit = (id) => {
    return dispatch => {
        dispatch(fetchDetailedMovieStarted());
        axios.get(`/${id}`, { params: {append_to_response: 'credits'}})
            .then(res => {
                let data = res.data;
                let movie = {   ...data,
                                backdrop_path: process.env.REACT_APP_API_MOVIE_BACKDROP_URL + data.backdrop_path,
                                poster_path: process.env.REACT_APP_API_POSTER_BASE_URL + data.poster_path
                            }
                dispatch(fetchDetailedMovieCompleted(movie));
            })
            .catch(err => {
                dispatch(fetchDetailedMovieFailed(`Fetching Movie with Id ${id} failed. Please try again`));
            });
    };
};