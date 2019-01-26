import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchDetailedMoviesInit } from '../../store/actions/index';
import classes from './MovieDetail.module.css';
import Loader from '../../components/Loader/Loader';
import CircularProgress from '../../components/CircularProgress/CircularProgress';
import Crew from '../../components/Crew/Crew';
import Cast from '../../components/Cast/Cast';

class MovieDetail extends Component {
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.fetchMovie(id);
    };

    getRandomColorRgb = () => {
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        return `rgb(${red}, ${green}, ${blue})`;
    }

    consolidatedCrew = (crew) => {
        let aggregatedCrew = {Director: [], Producer: [], Editor: [], Screenplay: []};
        crew.filter(crew => {
            if (['Director', 'Producer', 'Editor', 'Screenplay'].indexOf(crew.job) !== -1) {
                return crew
            }
        }).map((crew) => aggregatedCrew[crew.job].push(crew));

        return aggregatedCrew;
    } 


    render() {
        let movie = <Loader />
        if(this.props.movie) {

            let backgroundImage = `url(${this.props.movie.backdrop_path})`;
            let posterImage = `url(${this.props.movie.poster_path})`;
            let movieYear = moment(this.props.movie.release_date).format('YYYY');
            let consolidatedCrew = this.consolidatedCrew(this.props.movie.credits.crew);
            let topCast = this.props.movie.credits.cast.slice(0, 5);

            let finalCrew = []
            for(let key in consolidatedCrew) {
                finalCrew.push(<Crew title={key} crewList={consolidatedCrew[key]} key={key} />)
            }
            

            movie = (
                <React.Fragment>
                    <div className={classes.movieContainer} style={{backgroundImage: `${backgroundImage}`}}>
                        <div className={classes.movieInfoContainer}>
                            <div className={classes.moviePoster} style={{backgroundImage: posterImage}}></div>
                            <div className={classes.movieDetails}>
                                <h1>{this.props.movie.original_title} <strong>({movieYear})</strong></h1>
                                <CircularProgress percentage={this.props.movie.vote_average * 10}/>
                                <div>
                                    <h3>Overview</h3>
                                    <p>{this.props.movie.overview}</p>
                                </div>
                                <div className={classes.crewContainer}>
                                    <h3>Featured Crew</h3>
                                    <div className={classes.crewList}>
                                        {finalCrew}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Cast cast/>
                    </div>
                </React.Fragment>
            );
        };

        return movie;
    };
};

const mapStateToProps = state => {
    let {loading, movie} = state.movies.popular.currentlyViewing
    return {
        loading: loading,
        movie: movie
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMovie: (id) => dispatch(fetchDetailedMoviesInit(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);