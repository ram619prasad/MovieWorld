import { 
    FETCH_MOVIES_STARTED,
    FETCH_MOVIES_COMPLETED,
    FETCH_MOVIES_FAILED,
    FETCH_DETAILED_MOVIE_STARTED,
    FETCH_DETAILED_MOVIE_FAILED,
    FETCH_DETAILED_MOVIE_COMPLETED
} from '../actions/actionTypes';

const initialState = {
    popular: {
        movies: [],
        loading: false,
        errors: null,
        current_page: 1,
        total_pages: null,
        currentlyViewing: {
            loading: false,
            errors: null,
            movie: null
        }
    }
};

const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MOVIES_STARTED:
            return {
                ...state,
                popular: {
                    ...state.popular,
                    loading: true
                }
            }
        case FETCH_MOVIES_FAILED:
            return {
                ...state,
                popular: {
                    ...state.popular,
                    loading: false,
                    errors: action.error
                }
            }
        case FETCH_MOVIES_COMPLETED:
            let fetchedPages = state.popular.movies.map((mov) => Object.keys(mov)[0]);
            return {
                ...state,
                popular: {
                    ...state.popular,
                    loading: false,
                    current_page: action.current_page,
                    total_pages: action.total_pages,
                    movies: fetchedPages.indexOf(action.current_page.toString()) >= 0
                                ? state.popular.movies
                                : [...state.popular.movies, action.movies]
                }
            }
        case FETCH_DETAILED_MOVIE_STARTED:
            return {
                ...state,
                popular: {
                    ...state.popular,
                    currentlyViewing: {
                        ...state.popular.currentlyViewing,
                        loading: true
                    }
                }
            }
        case FETCH_DETAILED_MOVIE_FAILED:
            return {
                ...state,
                popular: {
                    ...state.popular,
                    currentlyViewing: {
                        ...state.currentlyViewing,
                        loading: false,
                        errors: action.error
                    }
                }
            }
        case FETCH_DETAILED_MOVIE_COMPLETED:
            return {
                ...state,
                popular: {
                    ...state.popular,
                    currentlyViewing: {
                        ...state.currentlyViewing,
                        loading: false,
                        movie: action.movie
                    }
                }
            }
        default:
            return state;
    }
};

export default moviesReducer;