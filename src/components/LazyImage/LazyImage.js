import React, { PureComponent } from 'react';

import classes from './LazyImage.module.css';
// import loadingGif from '../../assets/images/loading.gif';
import Loader from '../Loader/Loader';


class LazyImage extends PureComponent {
    state = {
        src: null
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ src: null })
        if(nextProps.src !== this.props.src) {
            const imageLoader = new Image();
            imageLoader.src = nextProps.src;
        
            imageLoader.onload = () => {
                this.setState({ src: nextProps.src });
            };
        }
    }

    componentDidMount() {
        console.log('componenet did mount');
        const { src } = this.props;
        const imageLoader = new Image();
        imageLoader.src = src;
    
        imageLoader.onload = () => {
          this.setState({ src });
        };
    }


    render() {
        let url = `url(${this.state.src})`;
        let styles = {
            backgroundImage: url,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: '100%',
            width: '100%'
        };

        let lazyImage = (
            <div className={classes.lazyImageContainer}>
                <Loader></Loader>
                <div className={classes.lazyImageControls}>
                    {this.props.children}
                </div>
            </div>
        );

        if (this.state.src) {
            lazyImage = (
                <div className={classes.lazyImageContainer}>
                    <div style={styles}></div>
                    <div className={classes.lazyImageControls}>
                        {this.props.children}
                    </div>
                </div>
            )
        }

        return lazyImage;
    }
}

export default LazyImage;