import React, { PureComponent } from 'react';

import Loader from '../Loader/Loader';
import classes from './LightBox.module.css';
import LazyImage from '../LazyImage/LazyImage';

class LightBox extends PureComponent {
    state = {
        data: null,
        selectedItem: 0,
        totalItems: null
    }

    static getDerivedStateFromProps = (props, state) => {
        if(props.data.length !== state.totalItems) {
            return {
                data: props.data,
                selectedItem: 0,
                totalItems: props.data.length
            }
        }

        return null;
    }

    nextClickHandler = () => {
        this.setState(prevState => {
            let {selectedItem, totalItems} = prevState;
            if (selectedItem + 1 === totalItems) return;
            if (selectedItem + 1 < totalItems) { selectedItem++ }

            return { selectedItem: selectedItem }
        });
    }

    previousClickHandler = () => {
        this.setState(prevState => {
            let {selectedItem} = prevState;
            if (selectedItem === 0) return;
            if (selectedItem - 1 < selectedItem) { selectedItem-- }

            return { selectedItem: selectedItem }
        });
    }

    render() {
        let { data, selectedItem, totalItems } = this.state;
        let lightBoxMarkup = <Loader />;

        if(data.length === 0) {
            lightBoxMarkup = <h1>Nothing to show!!</h1>
        } else {
            // let imageURL = `url(${data[selectedItem].file_path})`;
            lightBoxMarkup = (
                <React.Fragment>
                    <LazyImage src={data[selectedItem].file_path}>
                        <span onClick={this.previousClickHandler}
                            className={selectedItem === 0 ? classes.disabled : classes.enabled}>
                            &larr;
                        </span>          
                        <span onClick={this.nextClickHandler}
                            className={selectedItem + 1 === totalItems ? classes.disabled : classes.enabled}>
                            &rarr;
                        </span>
                    </LazyImage>
                </React.Fragment>
            )
        }

        return lightBoxMarkup;
    };
};

export default LightBox;