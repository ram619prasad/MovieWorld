import axios from '../../axiosInstances/tvInstance';

import {
    FETCH_TV_SHOWS_STARTED, FETCH_TV_SHOWS_COMPLETED, FETCH_TV_SHOWS_FAILED
} from './actionTypes';


export const fetchTVShowsStarted = () => {
    return {
        type: FETCH_TV_SHOWS_STARTED
    };
};

export const fetchTVShowsFailed = (error) => {
    return {
        type: FETCH_TV_SHOWS_FAILED,
        error: error
    };
};

export const fetchTVShowsCompleted = (tvshows, current_page, total_pages) => {
    return {
        type: FETCH_TV_SHOWS_COMPLETED,
        tvshows: tvshows,
        current_page: current_page,
        total_pages: total_pages
    };
};

export const fetchPopularTVShowsInit = (pageNo) => {
    return dispatch => {
        dispatch(fetchTVShowsStarted());
        let page = pageNo || 1;
        axios.get('/popular', { params: { page: page } })
            .then(res => {
                let popularTVShows = res.data.results.map((mov) => {
                    return { 
                        ...mov,
                        poster_path: process.env.REACT_APP_API_POSTER_BASE_URL_MEDIUM + mov.poster_path
                    };
                });

                let { page, total_pages } = res.data;
                let tvShows = {[page]: popularTVShows};
                dispatch(fetchTVShowsCompleted(tvShows, page, total_pages));
            })
            .catch(err => {
                dispatch(fetchTVShowsFailed('Fetching TVShows failed'));
            });
    };
};