import { 
    FETCH_MOVIES_STARTED,
    FETCH_MOVIES_COMPLETED,
    FETCH_MOVIES_FAILED
} from '../actions/actionTypes';

const initialState = {
    movies: [],
    loading: false,
    errors: null
};

const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MOVIES_STARTED:
            return {
                ...state,
                loading: true
            }
        case FETCH_MOVIES_FAILED:
            return {
                ...state,
                loading: false,
                errors: action.error
            }
        case FETCH_MOVIES_COMPLETED:
            return {
                ...state,
                loading: false,
                movies: state.movies.concat(action.movies)
            }
        default:
            return state;
    }
};

export default moviesReducer;