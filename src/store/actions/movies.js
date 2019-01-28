import axios from '../../axiosInstances/movieInstance';
import { fetchPosterBackgroundsInit, fetchMovieVideosInit } from './index';

import { 
    FETCH_MOVIES_STARTED, FETCH_MOVIES_COMPLETED, FETCH_MOVIES_FAILED,
    FETCH_MOVIE_DATA_STARTED, FETCH_MOVIE_DATA_COMPLETED, FETCH_MOVIE_DATA_FAILED,
    FETCH_MOVIE_DETAILS_STARTED, FETCH_MOVIE_DETAILS_FAILED, FETCH_MOVIE_DETAILS_COMPLETED,
} from './actionTypes';

export const fetchMoviesStarted = (category) => {
    return {
        type: FETCH_MOVIES_STARTED,
        category
    };
};

export const fetchMoviesFailed = (category, error) => {
    return {
        type: FETCH_MOVIES_FAILED,
        error: error,
        category
    };
};

export const fetchMoviesCompleted = (category, movies, current_page, total_pages) => {
    return {
        type: FETCH_MOVIES_COMPLETED,
        movies: movies,
        current_page: current_page,
        total_pages: total_pages,
        category
    };
};

export const fetchMoviesInit = (category, pageNo) => {
    return dispatch => {
        dispatch(fetchMoviesStarted(category));
        let page = pageNo || 1;
        axios.get(`/${category}`, { params: { page: page } })
            .then(res => {
                let modifiedMovies = res.data.results.map((mov) => {
                    return { 
                        ...mov,
                        poster_path: process.env.REACT_APP_API_POSTER_BASE_URL_MEDIUM + mov.poster_path
                    };
                });
                let{page, total_pages} = res.data;
                let movies = {[page]: modifiedMovies};
                dispatch(fetchMoviesCompleted(category, movies, page, total_pages));
            })
            .catch(err => {
                dispatch(fetchMoviesFailed(category, 'Fetching movies failed'));
            });
    };
};

// export const fetchMovieDetailsStarted = (category) => {
//     return {
//         type: FETCH_MOVIE_DETAILS_STARTED,
//         category
//     };
// };

// export const fetchMovieDetailsFailed = (category, error) => {
//     return {
//         type: FETCH_MOVIE_DETAILS_FAILED,
//         error: error,
//         category
//     };
// };

export const fetchMovieDetailsCompleted = (category, id, movie) => {
    return {
        type: FETCH_MOVIE_DETAILS_COMPLETED,
        movie: movie,
        category,
        id
    };
};

export const fetchMovieDetailsInit = (category, id) => {
    return dispatch => {
        // dispatch(fetchMovieDetailsStarted(category));

        return axios.get(`/${id}`, { params: {append_to_response: 'credits'}})
            .then(res => {
                let data = res.data;
                let movie = {   ...data,
                                backdrop_path: process.env.REACT_APP_API_MOVIE_BACKDROP_URL + data.backdrop_path,
                                poster_path: process.env.REACT_APP_API_POSTER_BASE_URL + data.poster_path
                            }                
                dispatch(fetchMovieDetailsCompleted(category, id, movie));
            })
            .catch(err => {
                // dispatch(fetchMovieDetailsFailed(category, `Fetching Movie with Id ${id} failed. Please try again`));
            });
    };
};

export const fetchMovieStarted = (category) => {
    return {
        type: FETCH_MOVIE_DATA_STARTED,
        category
    };
};

export const fetchMovieFailed = (category, error) => {
    return {
        type: FETCH_MOVIE_DATA_FAILED,
        error,
        category
    };
};

export const fetchMovieCompleted = (category, id) => {
    return {
        type: FETCH_MOVIE_DATA_COMPLETED,
        info: `Movie data, Videos, Posters and Backdrops loaded for movie ${id}`,
        category
    };
};

export const fetchMovieInit = (category, id) => {
    return dispatch => {
        dispatch(fetchMovieStarted(category));
        return Promise.all([
                dispatch(fetchMovieDetailsInit(category, id)),
                dispatch(fetchMovieVideosInit(id)),
                dispatch(fetchPosterBackgroundsInit(id))
            ]).then(() =>
                dispatch(fetchMovieCompleted(category, id))
            ).catch(err =>
                dispatch(fetchMovieFailed(category))
            )
    };
};