import React, { Component } from 'react';

import classes from './Media.module.css';
import LightBox from '../../components/LightBox/LightBox';
import Loader from '../../components/Loader/Loader';

class Media extends Component {

    state = {
        selected: 'posters',
        posters: null,
        videos: null,
        backdrops: null
    }

    static getDerivedStateFromProps(props, state) {
        let {videos, posters, backdrops} = props;
        if(videos !== state.videos || posters !== state.posters || backdrops !== state.backdrops) {
            return {
                posters: posters,
                videos: videos.results,
                backdrops: backdrops
            }
        }

        return null;
    }

    handleMediaClick = (type) => {
        this.setState({selected: type});
    }

    // 
    render() {
        let {videos, posters, backdrops, selected} = this.state;
        let lightBox = <Loader />;

        if (videos && posters && backdrops) {
            lightBox = (
                <div className={classes.mediaContainer}>
                    <nav className={classes.mediaMenu}>
                        <h2>Media</h2>
                        <ul className={classes.mediaTypes}>
                            <li onClick={() => this.handleMediaClick('posters')}>
                                Posters ({posters.length || 0})
                            </li>
                            <li onClick={() => this.handleMediaClick('backdrops')}>
                                Backdrops ({backdrops.length || 0})
                            </li>
                            <li onClick={() => this.handleMediaClick('videos')}>
                                Videos ({videos.length || 0})
                            </li>
                        </ul>
                    </nav>
                    <div className={classes.mediaLightBox}>
                        <LightBox data={this.state[selected]}/>
                    </div>
                </div>
            )
        }

        return lightBox;
    };
};

export default Media;