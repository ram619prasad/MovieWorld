import React, { Component } from 'react';
import axios from '../../axiosInstances/movieInstance';

import Loader from '../../components/Loader/Loader';
import classes from './MoviesList.module.css';

class MoviesList extends Component {
    state = {
        popularMovies: [],
        errored: false
    }
    
    componentDidMount() {
    axios.get('/popular')
        .then(res => {
            let popularMovies = res.data.results.map((mov) => {
                return { [mov.id]: {...mov} }
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
        console.log('====================================');
        console.log('env', process.env);
        console.log('====================================');
        let movieList = <Loader/>;

        if(this.state.errored) {
            movieList = (
                <div className={classes.errorContainer}>
                    <p>Fetching failed. Please check your connection and try again.</p>
                </div>
            )
        }

        if(this.state.popularMovies.length > 0) {
            movieList = <h1>MoviesList</h1>;
        }

        return movieList
    };
};

export default MoviesList;