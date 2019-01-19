import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const navigationItem = (props) => {
    let { to, classes, activeClass, children } = props;

    return <NavLink to={to} className={classes} activeClassName={activeClass}>
                {children}
            </NavLink>
};

navigationItem.propTypes = {
    to: PropTypes.string.isRequired,
    classes: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    activeClass: PropTypes.string,
};

export default navigationItem;