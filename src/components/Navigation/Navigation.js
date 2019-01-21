import React from 'react';

import classes from './Navigation.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigation = () => {
    return (
        <nav className={classes.nav}>
            <ul className={classes.navList}>
                <NavigationItem
                    to="/movie/1" 
                    classes={classes.navListItem}
                    activeClass={classes.navListItemActive}>Movies</NavigationItem>
                <NavigationItem 
                    to="/movie/2" 
                    classes={classes.navListItem}
                    activeClass={classes.navListItemActive}>TV Shows</NavigationItem>
                <NavigationItem 
                    to="/movie/3"
                    classes={classes.navListItem}
                    activeClass={classes.navListItemActive}>Discover People</NavigationItem>
            </ul>
        </nav>
    );
};

export default navigation;