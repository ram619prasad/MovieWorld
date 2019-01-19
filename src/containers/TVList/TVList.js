import React, { Component } from 'react';

import classes from './TVList.module.css';

class TVList extends Component {
    render() {
        return (
            <div className={classes.tvList}>
                <h1>TV List</h1>
            </div>
        );
    };
};

export default TVList;