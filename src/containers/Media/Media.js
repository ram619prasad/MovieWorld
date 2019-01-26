import React, { Component } from 'react';

import classes from './Media.module.css';

class Media extends Component {

    handleMediaClick = () => {
        
    }

    render() {
        let {videos, posters, backdrops} = this.props;

        return(
            <div className={classes.mediaContainer}>
                <nav className={classes.mediaMenu}>
                    <h2>Media</h2>
                    <ul className={classes.mediaTypes}>
                        <li>Videos ({videos.length || 0})</li>
                        <li>Backdrops ({backdrops.length || 0})</li>
                        <li>Posters ({posters.length || 0})</li>
                    </ul>
                </nav>
                <div className={classes.mediaLightBox}>

                </div>
            </div>
        );
    };
};

export default Media;