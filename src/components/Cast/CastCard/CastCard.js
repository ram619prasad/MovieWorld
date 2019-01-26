import React from 'react';

import classes from './CastCard.module.css';

const castCard = (props) => {
    let {name, character, profile_path} = props.castDetails;
    let imgURL = process.env.REACT_APP_API_CAST_PROFILE_PHOTO_URL + profile_path;

    return (
        <div className={classes.castCard}>
            <img src={imgURL} alt={name} />
            <h5>{name}</h5>
            <h6>{character}</h6>
        </div>
    );
};

export default castCard;