import React from 'react';
import { Link } from 'react-router-dom';

import classes from './PaginationLink.module.css';

const paginationLink = (props) => {
    let { pathName, search, overRideClass } = props;
    return (
        <div className={overRideClass ? overRideClass : classes.paginationLink}>
            <Link to={{ pathname: pathName, search: search }}>
                {props.children}
            </Link>
        </div>
    );
};

export default paginationLink;