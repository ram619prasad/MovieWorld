import React from 'react';

import Navigation from '../Navigation/Navigation';
import classes from './Header.module.css';

const header = () => {
    return(
        <header className={classes.header}>
            <Navigation />
            {/* <nav className={classes.headerNav}>
                <ul className={classes.headerList}>
                    <li className={classes.headerListItem}>
                        <a href="/" className={classes.headerLink}>Movies</a>
                    </li>
                    <li className={classes.headerListItem}>
                        <a href="/" className={classes.headerLink}>Tv Shows</a>
                    </li>
                    <li className={classes.headerListItem}>
                        <a href="/" className={classes.headerLink}>Discover People</a>
                    </li>
                </ul>
            </nav> */}
        </header>
    );
};

export default header;