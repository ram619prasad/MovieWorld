import React, { Component } from 'react';

import classes from './PeopleList.module.css';

class PeopleList extends Component {
    render() {
        return (
            <div className={classes.peopleList}>
                <h1>People List</h1>
            </div>
        );
    };
};

export default PeopleList;