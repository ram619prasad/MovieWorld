import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '../../../components/CircularProgress/CircularProgress';

import classes from './MovieListItem.module.css';

const movieListItem = (props) => {
    let { title, poster_path, release_date, vote_average } = props.data;

    return (
        <div className={classes.movieCard}>
            <img src={poster_path} alt={title} className={classes.moviePoster}/>
            <div className={classes.movieInfo}>
                <CircularProgress percentage={vote_average * 10}/>
                <div>
                    <h3>{title}</h3>
                    <strong>{release_date}</strong>
                </div>
            </div>
        </div>
    );
};

movieListItem.propTypes = {
    data: PropTypes.object.isRequired,
    title: PropTypes.string,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.string
}

export default movieListItem;