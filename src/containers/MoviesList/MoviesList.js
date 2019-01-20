import React, { Component } from 'react';
import axios from '../../axiosInstances/movieInstance';

import Loader from '../../components/Loader/Loader';
import classes from './MoviesList.module.css';
import MoviesListItem from './MovieListItem/MovieListItem';

class MoviesList extends Component {
    state = {
        popularMovies: [],
        errored: false
    }
    
    componentDidMount() {
    axios.get('/popular')
        .then(res => {
            let popularMovies = res.data.results.map((mov) => {
                return { 
                    [mov.id]: { ...mov,
                                poster_path: process.env.REACT_APP_API_POSTER_BASE_URL_MEDIUM + mov.poster_path
                              }
                }
            });

            this.setState({
                ...this.state,
                popularMovies: popularMovies,
            });
        })
        .catch(err => {
            this.setState({ 
                ...this.state,
                errored: true
            });
        })
    }

    render() {
        let movieList = <Loader/>;

        if(this.state.errored) {
            movieList = (
                <div className={classes.errorContainer}>
                    <p>Fetching failed. Please check your connection and try again.</p>
                </div>
            )
        }

        if(this.state.popularMovies.length > 0) {
            let movieListItems = this.state.popularMovies.map((mov) => {
                                    let id, data;
                                    for(let key in mov) {
                                        id = key
                                        data = mov[id]
                                    }
                                    return <MoviesListItem key={id} data={data}/>
                                });

            movieList = (
                <div className={classes.movieContainer}>
                    {movieListItems}
                </div>
            );
        }

        return movieList
    };
};

export default MoviesList;