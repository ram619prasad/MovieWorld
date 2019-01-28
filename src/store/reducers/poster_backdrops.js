import {
    FETCH_POSTER_BACKDROPS_STARTED, FETCH_POSTER_BACKDROPS_COMPLETED, FETCH_POSTER_BACKDROPS_FAILED
} from '../actions/actionTypes';

let initialState = {
    poster_backdrops: {
        loading: false,
        errors: [],
        data: {}
    }
};

const posterBackdropReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTER_BACKDROPS_STARTED:
            return {
                ...state,
                poster_backdrops: {
                    ...state.poster_backdrops,
                    loading: true
                }
            }
        case FETCH_POSTER_BACKDROPS_FAILED:
            return {
                ...state,
                poster_backdrops: {
                    ...state.poster_backdrops,
                    loading: false,
                    errors: state.poster_backdrops.errors.concat(action.error)
                }
            }
        case FETCH_POSTER_BACKDROPS_COMPLETED:
            return {
                poster_backdrops: {
                    ...state.poster_backdrops,
                    loading: false,
                    data: {
                        ...state.poster_backdrops.data,
                        [action.id]: action.posters_backdrops
                    }
                }
            }
        default:
            return state;
    }
};

export default posterBackdropReducer;
