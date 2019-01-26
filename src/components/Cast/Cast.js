import React from 'react';

import CastCard from './CastCard/CastCard';
import classes from './Cast.module.css';

const Cast = (props) => {
    let cast = null;

    if (props.cast) {
        cast = props.cast.map(cast => {
            return <CastCard key={cast.id} castDetails={cast} />
        })
    };

    return (
        <div className={classes.castContainer}>
            <h3>Top Billed Cast</h3>
            <div className={classes.castList}>
                {cast}
            </div>
            <a href="/" className={classes.fullCast}> &rarr; Full Cast & Crew</a>
        </div>
    );
};

export default Cast;