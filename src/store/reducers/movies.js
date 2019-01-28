import { 
    FETCH_MOVIES_STARTED, FETCH_MOVIES_COMPLETED, FETCH_MOVIES_FAILED,
    FETCH_MOVIE_DATA_STARTED, FETCH_MOVIE_DATA_FAILED, FETCH_MOVIE_DATA_COMPLETED,
    FETCH_MOVIE_DETAILS_COMPLETED,
} from '../actions/actionTypes';

let baseDS = {
    index: [],
    loading: false,
    errors: null,
    current_page: 1,
    total_pages: null,
    show: {
        info: '',
        loading: false,
        errors: null,
        item: {}
    }
}

let initialState = {
    popular: baseDS,
    top_rated: baseDS,
    upcoming: baseDS
}

const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MOVIES_STARTED:
            return {
                ...state,
                [action.category]: {
                    ...state[action.category],
                    loading: true
                }
            }
        case FETCH_MOVIES_FAILED:
            return {
                ...state,
                [action.category]: {
                    ...state[action.category],
                    loading: false,
                    errors: action.error
                }
            }
        case FETCH_MOVIES_COMPLETED:
            return {
                ...state,
                [action.category]: {
                    ...state[action.category],
                    loading: false,
                    current_page: action.current_page,
                    total_pages: action.total_pages,
                    index: state[action.category].index.concat(action.movies)
                }
            }
        case FETCH_MOVIE_DATA_STARTED:
            return {
                ...state,
                [action.category]: {
                    ...state[action.category],
                    show: {
                        ...state[action.category].show,
                        loading: true
                    }
                }
            }
        case FETCH_MOVIE_DATA_FAILED:
            return {
                ...state,
                [action.category]: {
                    ...state[action.category],
                    show: {
                        ...state[action.category].show,
                        loading: false,
                        errors: action.error
                    }
                }
            }
        case FETCH_MOVIE_DATA_COMPLETED:
            return {
                ...state,
                [action.category]: {
                    ...state[action.category],
                    show: {
                        ...state[action.category].show,
                        info: action.info
                    }
                }
            }
        case FETCH_MOVIE_DETAILS_COMPLETED:
            return {
                ...state,
                [action.category]: {
                    ...state[action.category],
                    show: {
                        ...state[action.category].show,
                        loading: false,
                        item: {
                            ...state[action.category].show.item,
                            [action.id]: action.movie
                        }
                    }
                }
            }
        default:
            return state;
    }
};

export default moviesReducer;