import axios from '../../axiosInstances/movieInstance';

import { 
    FETCH_MOVIES_STARTED,
    FETCH_MOVIES_COMPLETED,
    FETCH_MOVIES_FAILED
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