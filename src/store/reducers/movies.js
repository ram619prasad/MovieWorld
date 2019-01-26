import { 
    FETCH_MOVIES_STARTED, FETCH_MOVIES_COMPLETED, FETCH_MOVIES_FAILED,
    FETCH_MOVIE_DATA_STARTED, FETCH_MOVIE_DATA_COMPLETED, FETCH_MOVIE_DATA_FAILED,
    FETCH_MOVIE_DETAILS_STARTED, FETCH_MOVIE_DETAILS_FAILED, FETCH_MOVIE_DETAILS_COMPLETED,
    FETCH_MOVIE_VIDEOS_STARTED, FETCH_MOVIE_VIDEOS_COMPLETED, FETCH_MOVIE_VIDEOS_FAILED,
    FETCH_MOVIE_POSTER_BACKDROPS_STARTED, FETCH_MOVIE_POSTER_BACKDROPS_COMPLETED, FETCH_MOVIE_POSTER_BACKDROPS_FAILED,
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
            info: null,
            movie: {
                loading: false,
                errors: null,
                data: null
            },
            videos: {
                loading: false,
                errors: null,
                data: null
            },
            posters_backdrops: {
                loading: false,
                errors: null,
                posters: null,
                backdrops: null
            }
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
        case FETCH_MOVIE_DETAILS_STARTED:
            return {
                ...state,
                popular: {
                    ...state.popular,
                    currentlyViewing: {
                        ...state.popular.currentlyViewing,
                        movie: {
                            ...state.popular.currentlyViewing.movie,
                            loading: true
                        }
                    }
                }
            }
        case FETCH_MOVIE_DETAILS_FAILED:
            return {
                ...state,
                popular: {
                    ...state.popular,
                    currentlyViewing: {
                        ...state.popular.currentlyViewing,
                        movie: {
                            ...state.popular.currentlyViewing.movie,
                            loading: false,
                            errors: action.error   
                        }
                    }
                }
            }
        case FETCH_MOVIE_DETAILS_COMPLETED:
            return {
                ...state,
                popular: {
                    ...state.popular,
                    currentlyViewing: {
                        ...state.popular.currentlyViewing,
                        movie: {
                            ...state.popular.currentlyViewing.movie,
                            loading: false,
                            data: action.movie
                        }
                    }
                }
            }
        case FETCH_MOVIE_VIDEOS_STARTED:
            return {
                ...state,
                popular: {
                    ...state.popular,
                    currentlyViewing: {
                        ...state.popular.currentlyViewing,
                        videos: {
                            ...state.popular.currentlyViewing.videos,
                            loading: true
                        }
                    }
                }
            }
        case FETCH_MOVIE_VIDEOS_FAILED:
            return {
                ...state,
                popular: {
                    ...state.popular,
                    currentlyViewing: {
                        ...state.popular.currentlyViewing,
                        videos: {
                            ...state.popular.currentlyViewing.videos,
                            loading: false,
                            errors: action.error
                        }
                    }
                }
            }
        case FETCH_MOVIE_VIDEOS_COMPLETED:
            return {
                ...state,
                popular: {
                    ...state.popular,
                    currentlyViewing: {
                        ...state.popular.currentlyViewing,
                        videos: {
                            ...state.popular.currentlyViewing.videos,
                            loading: false,
                            data: action.videos
                        }
                    }
                }
            }
        case FETCH_MOVIE_POSTER_BACKDROPS_STARTED:
            return {
                ...state,
                popular: {
                    ...state.popular,
                    currentlyViewing: {
                        ...state.popular.currentlyViewing,
                        posters_backdrops: {
                            ...state.popular.currentlyViewing.posters_backdrops,
                            loading: true
                        }
                    }
                }
            }
        case FETCH_MOVIE_POSTER_BACKDROPS_FAILED:
            return {
                ...state,
                popular: {
                    ...state.popular,
                    currentlyViewing: {
                        ...state.popular.currentlyViewing,
                        posters_backdrops: {
                            ...state.popular.currentlyViewing.posters_backdrops,
                            loading: false,
                            errors: action.error
                        }
                    }
                }
            }
        case FETCH_MOVIE_POSTER_BACKDROPS_COMPLETED:
            return {
                ...state,
                popular: {
                    ...state.popular,
                    currentlyViewing: {
                        ...state.popular.currentlyViewing,
                        posters_backdrops: {
                            ...state.popular.currentlyViewing.posters_backdrops,
                            loading: false,
                            posters: action.data.posters,
                            backdrops: action.data.backdrops
                        }
                    }
                }
            }
        case FETCH_MOVIE_DATA_STARTED:
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
        case FETCH_MOVIE_DATA_FAILED:
            return {
                ...state,
                popular: {
                    ...state.popular,
                    currentlyViewing: {
                        ...state.popular.currentlyViewing,
                        loading: false,
                        errors: action.error
                    }
                }
            }
        case FETCH_MOVIE_DATA_COMPLETED:
            return {
                ...state,
                popular: {
                    ...state.popular,
                    currentlyViewing: {
                        ...state.popular.currentlyViewing,
                        loading: false,
                        info: action.info
                    }
                }
            }
        default:
            return state;
    }
};

export default moviesReducer;