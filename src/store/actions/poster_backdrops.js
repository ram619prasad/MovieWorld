import axios from '../../axiosInstances/movieInstance';

import {
    FETCH_POSTER_BACKDROPS_STARTED, FETCH_POSTER_BACKDROPS_COMPLETED, FETCH_POSTER_BACKDROPS_FAILED
} from './actionTypes';

export const fetchPosterBackgroundsStarted = () => {
    return {
        type: FETCH_POSTER_BACKDROPS_STARTED
    };
};

export const fetchPosterBackgroundsFailed = (error) => {
    return {
        type: FETCH_POSTER_BACKDROPS_FAILED,
        error: error
    };
};

export const fetchPosterBackgroundsCompleted = (posters_backdrops, id) => {
    return {
        type: FETCH_POSTER_BACKDROPS_COMPLETED,
        posters_backdrops,
        id
    };
};

export const fetchPosterBackgroundsInit = (id) => {
    return dispatch => {
        dispatch(fetchPosterBackgroundsStarted());
        return axios.get(`/${id}/images`, { params: { include_image_language: 'en,null' } })
            .then(res => {
                let {id, backdrops, posters} = res.data;

                backdrops = backdrops.map(bd => {
                    return {...bd, file_path: process.env.REACT_APP_API_POSTER_BASE_URL_MEDIUM + bd.file_path}
                });

                posters = posters.map(pos => {
                    return {...pos, file_path: process.env.REACT_APP_API_POSTER_BASE_URL_MEDIUM + pos.file_path}
                })

                let data = {id, posters, backdrops}
                dispatch(fetchPosterBackgroundsCompleted(data, id));
            })
            .catch(err => {
                dispatch(fetchPosterBackgroundsFailed(`Fetching Videos for Movie with Id ${id} failed. Please try again`));
            });
    };
};