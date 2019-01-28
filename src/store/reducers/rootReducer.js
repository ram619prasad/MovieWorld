import { combineReducers } from 'redux';

import moviesReducer from './movies';
import posterBackdropsReducer from './poster_backdrops';
import videosReducer from './videos';

const rootReducer = combineReducers({
    movies: moviesReducer,
    images: posterBackdropsReducer,
    videos: videosReducer
});

export default rootReducer;