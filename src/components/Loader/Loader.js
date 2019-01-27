import React from 'react';
import classes from './Loader.module.css';

export default (props) => {
    return (
        <div className={classes.loderContainer}>
            <div className={classes.Loader}>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};