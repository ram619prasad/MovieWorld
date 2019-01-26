import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchMovieInit } from '../../store/actions/index';
import classes from './MovieDetail.module.css';
import Loader from '../../components/Loader/Loader';
import CircularProgress from '../../components/CircularProgress/CircularProgress';
import Crew from '../../components/Crew/Crew';
import Cast from '../../components/Cast/Cast';
import Media from '../Media/Media';

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
        let {movie, videos, posters, backdrops} = this.props;
        let movieMarkup = <Loader />
        if (movie && videos && posters && backdrops) {
            let backgroundImage = `url(${movie.backdrop_path})`;
            let posterImage = `url(${movie.poster_path})`;
            let movieYear = moment(movie.release_date).format('YYYY');
            let consolidatedCrew = this.consolidatedCrew(movie.credits.crew);
            let topCast = movie.credits.cast.slice(0, 5);

            let finalCrew = []
            for(let key in consolidatedCrew) {
                finalCrew.push(<Crew title={key} crewList={consolidatedCrew[key]} key={key} />)
            }
            

            movieMarkup = (
                <React.Fragment>
                    <div className={classes.movieContainer} style={{backgroundImage: `${backgroundImage}`}}>
                        <div className={classes.movieInfoContainer}>
                            <div className={classes.moviePoster} style={{backgroundImage: posterImage}}></div>
                            <div className={classes.movieDetails}>
                                <h1>{movie.original_title} <strong>({movieYear})</strong></h1>
                                <CircularProgress percentage={movie.vote_average * 10}/>
                                <div>
                                    <h3>Overview</h3>
                                    <p>{movie.overview}</p>
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

                    <div className={classes.castContainer}>
                        <Cast cast={topCast}/>
                    </div>

                    <div className={classes.mediaContainer}>
                        <Media
                            videos={videos}
                            posters={posters}
                            backdrops={backdrops}
                        />
                    </div>
                </React.Fragment>
            );
        };

        return movieMarkup;
    };
};

const mapStateToProps = state => {
    let {loading, movie, videos, posters_backdrops} = state.movies.popular.currentlyViewing;
    let {posters, backdrops} = posters_backdrops
    return {
        loading: loading,
        movie: movie.data,
        videos: videos.data,
        posters: posters,
        backdrops: backdrops
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMovie: (id) => dispatch(fetchMovieInit(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);