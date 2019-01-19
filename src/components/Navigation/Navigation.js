import React from 'react';

import classes from './Navigation.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigation = () => {
    return (
        <nav className={classes.nav}>
            <ul className={classes.navList}>
                <NavigationItem
                    to="/movie" 
                    classes={classes.navListItem}
                    activeClass={classes.navListItemActive}>Movies</NavigationItem>
                <NavigationItem 
                    to="/tv" 
                    classes={classes.navListItem}
                    activeClass={classes.navListItemActive}>TV Shows</NavigationItem>
                <NavigationItem 
                    to="/people"
                    classes={classes.navListItem}
                    activeClass={classes.navListItemActive}>Discover People</NavigationItem>
            </ul>
        </nav>
    );
};

export default navigation;