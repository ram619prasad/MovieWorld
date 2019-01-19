import React from 'react';

import classes from './Navigation.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigation = () => {
    return (
        <nav className={classes.nav}>
            <ul className={classes.navList}>
                <NavigationItem
                    to="/movie" 
                    className={classes.navListItem}
                    activeClassName={classes.navListItemActive}>Movies</NavigationItem>
                <NavigationItem 
                    to="/tv" 
                    className={classes.navListItem}
                    activeClassName={classes.navListItemActive}>TV Shows</NavigationItem>
                <NavigationItem 
                    to="/people"
                    className={classes.navListItem}
                    activeClassName={classes.navListItemActive}>Discover People</NavigationItem>
            </ul>
        </nav>
    );
};

export default navigation;