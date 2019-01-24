import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchDetailedMoviesInit } from '../../store/actions/index';

class MovieDetail extends Component {
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.fetchMovie(id)
    };


    render() {
        return (
            <h1>Movie Detail</h1>
        );
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMovie: (id) => dispatch(fetchDetailedMoviesInit(id))
    };
};

export default connect(null, mapDispatchToProps)(MovieDetail);