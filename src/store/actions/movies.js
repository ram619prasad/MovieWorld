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

export const fetchMoviesCompleted = (movies) => {
    return {
        type: FETCH_MOVIES_COMPLETED,
        movies: movies
    };
};