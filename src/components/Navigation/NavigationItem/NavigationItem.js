import React from 'react';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => (
    <NavLink {...props}>{props.children}</NavLink>
);

export default navigationItem;