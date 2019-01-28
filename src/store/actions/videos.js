import axios from '../../axiosInstances/movieInstance';

import {
    FETCH_VIDEOS_STARTED, FETCH_VIDEOS_FAILED, FETCH_VIDEOS_COMPLETED
} from './actionTypes';

export const fetchVideosStarted = () => {
    return {
        type: FETCH_VIDEOS_STARTED
    };
};

export const fetchVideosFailed = (error) => {
    return {
        type: FETCH_VIDEOS_FAILED,
        error
    };
};

export const fetchVideosCompleted = (videos, id) => {
    return {
        type: FETCH_VIDEOS_COMPLETED,
        videos,
        id
    };
};

export const fetchMovieVideosInit = (id) => {
    return dispatch => {
        dispatch(fetchVideosStarted());
        return axios.get(`/${id}/videos`)
            .then(res => {
                let videos = res.data;
                dispatch(fetchVideosCompleted(videos, id));
            })
            .catch(err => {
                dispatch(fetchVideosFailed(`Fetching Videos for Movie with Id ${id} failed. Please try again`));
            });
    };
};