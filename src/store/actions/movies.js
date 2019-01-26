import axios from '../../axiosInstances/movieInstance';

import { 
    FETCH_MOVIES_STARTED, FETCH_MOVIES_COMPLETED, FETCH_MOVIES_FAILED,
    FETCH_MOVIE_DATA_STARTED, FETCH_MOVIE_DATA_COMPLETED, FETCH_MOVIE_DATA_FAILED,
    FETCH_MOVIE_DETAILS_STARTED, FETCH_MOVIE_DETAILS_FAILED, FETCH_MOVIE_DETAILS_COMPLETED,
    FETCH_MOVIE_VIDEOS_STARTED, FETCH_MOVIE_VIDEOS_COMPLETED, FETCH_MOVIE_VIDEOS_FAILED,
    FETCH_MOVIE_POSTER_BACKDROPS_STARTED, FETCH_MOVIE_POSTER_BACKDROPS_COMPLETED, FETCH_MOVIE_POSTER_BACKDROPS_FAILED,
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

export const fetchMovieDetailsStarted = () => {
    return {
        type: FETCH_MOVIE_DETAILS_STARTED
    };
};

export const fetchMovieDetailsFailed = (error) => {
    return {
        type: FETCH_MOVIE_DETAILS_FAILED,
        error: error
    };
};

export const fetchMovieDetailsCompleted = (movie) => {
    return {
        type: FETCH_MOVIE_DETAILS_COMPLETED,
        movie: movie,
    };
};

export const fetchMovieDetailsInit = (id) => {
    return dispatch => {
        dispatch(fetchMovieDetailsStarted());
        return axios.get(`/${id}`, { params: {append_to_response: 'credits'}})
            .then(res => {
                let data = res.data;
                let movie = {   ...data,
                                backdrop_path: process.env.REACT_APP_API_MOVIE_BACKDROP_URL + data.backdrop_path,
                                poster_path: process.env.REACT_APP_API_POSTER_BASE_URL + data.poster_path
                            }
                dispatch(fetchMovieDetailsCompleted(movie));
            })
            .catch(err => {
                dispatch(fetchMovieDetailsFailed(`Fetching Movie with Id ${id} failed. Please try again`));
            });
    };
};

export const fetchMovieVideosStarted = () => {
    return {
        type: FETCH_MOVIE_VIDEOS_STARTED
    };
};

export const fetchMovieVideosFailed = (error) => {
    return {
        type: FETCH_MOVIE_VIDEOS_FAILED,
        error: error
    };
};

export const fetchMovieVideosCompleted = (videos) => {
    return {
        type: FETCH_MOVIE_VIDEOS_COMPLETED,
        videos: videos,
    };
};

export const fetchMovieVideosInit = (id) => {
    return dispatch => {
        dispatch(fetchMovieVideosStarted());
        return axios.get(`/${id}/videos`)
            .then(res => {
                let videos = res.data;
                dispatch(fetchMovieVideosCompleted(videos));
            })
            .catch(err => {
                dispatch(fetchMovieVideosFailed(`Fetching Videos for Movie with Id ${id} failed. Please try again`));
            });
    };
};

export const fetchPosterBackgroundsStarted = () => {
    return {
        type: FETCH_MOVIE_POSTER_BACKDROPS_STARTED
    };
};

export const fetchPosterBackgroundsFailed = (error) => {
    return {
        type: FETCH_MOVIE_POSTER_BACKDROPS_FAILED,
        error: error
    };
};

export const fetchPosterBackgroundsCompleted = (data) => {
    return {
        type: FETCH_MOVIE_POSTER_BACKDROPS_COMPLETED,
        data: data,
    };
};

export const fetchPosterBackgroundsInit = (id) => {
    return dispatch => {
        dispatch(fetchPosterBackgroundsStarted());
        return axios.get(`/${id}/images`, { params: { include_image_language: 'en,null' } })
            .then(res => {
                let data = res.data;
                dispatch(fetchPosterBackgroundsCompleted(data));
            })
            .catch(err => {
                dispatch(fetchPosterBackgroundsFailed(`Fetching Videos for Movie with Id ${id} failed. Please try again`));
            });
    };
};

export const fetchMovieStarted = () => {
    return {
        type: FETCH_MOVIE_DATA_STARTED
    };
};

export const fetchMovieFailed = (error) => {
    return {
        type: FETCH_MOVIE_DATA_FAILED,
        error: error
    };
};

export const fetchMovieCompleted = () => {
    return {
        type: FETCH_MOVIE_DATA_COMPLETED,
        info: 'All movie data fetched succesfully',
    };
};

export const fetchMovieInit = (id) => {
    return dispatch => {
        dispatch(fetchMovieStarted());
        return Promise.all([
                dispatch(fetchMovieDetailsInit(id)),
                dispatch(fetchMovieVideosInit(id)),
                dispatch(fetchPosterBackgroundsInit(id))
            ]).then(() =>
                dispatch(fetchMovieCompleted())
            ).catch(err =>
                dispatch(fetchMovieFailed())
            )
    };
};