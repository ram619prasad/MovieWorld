import {
    FETCH_VIDEOS_STARTED, FETCH_VIDEOS_FAILED, FETCH_VIDEOS_COMPLETED
} from '../actions/actionTypes';

let initialState = {
    videos: {
        loading: false,
        errors: [],
        data: {}
    }
};

const posterBackdropReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_VIDEOS_STARTED:
            return {
                ...state,
                videos: {
                    ...state.videos,
                    loading: true
                }
            }
        case FETCH_VIDEOS_FAILED:
            return {
                ...state,
                videos: {
                    ...state.videos,
                    loading: false,
                    errors: state.videos.errors.concat(action.error)
                }
            }
        case FETCH_VIDEOS_COMPLETED:
            return {
                videos: {
                    ...state.videos,
                    loading: false,
                    data: {
                        ...state.videos.data,
                        [action.id]: action.videos
                    }
                }
            }
        default:
            return state;
    }
};

export default posterBackdropReducer;
