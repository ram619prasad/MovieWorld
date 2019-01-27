import React, { PureComponent } from 'react';

import classes from './LazyImage.module.css';
// import loadingGif from '../../assets/images/loading.gif';
import Loader from '../Loader/Loader';


class LazyImage extends PureComponent {
    state = {
        src: null
    }

    componentWillReceiveProps(nextProps) {
        // console.log('====================================');
        // console.log('coming');
        this.setState({ src: null })
        console.log('====================================');
        if(nextProps.src !== this.props.src) {
            console.log('previous props not equal to current props');
            const imageLoader = new Image();
            console.log('nextProps', nextProps)
            imageLoader.src = nextProps.src;
        
            imageLoader.onload = () => {
                console.log('new src', nextProps.src)
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

    // static getDevivedStateFromProps = (props, state) => {
    //     console.log('====================================');
    //     console.log('dude');
    //     console.log('====================================');
    //     // const { src } = props;
    //     // const imageLoader = new Image();
    //     // imageLoader.src = src;
    //     // imageLoader.onload = () => {
    //     //     // this.setState({ src });
    //     //     return {
    //     //         src: src
    //     //     }
    //     // };
    //     // if(props.src !)
    //     if (props.src !== state.src) {
    //         return {
    //             src: 'ram'
    //         }
    //     }

    //     return null;
    // }
    // shouldComponentUpdate() {
    //     return true;
    // }


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