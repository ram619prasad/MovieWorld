import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from './Pagination.module.css';
import PaginationLink from './PaginationLink/PaginationLink';

class Pagination extends Component {
    state = {
        firstPage: 1,
        pathName: '',
        type: '',
        currentPage: null,
        totalPages: null
    };

    paginationStartBlock = () => {
        return (
            <React.Fragment>
                {   this.state.currentPage > this.state.firstPage &&
                    <PaginationLink pathName={this.state.pathName} search={`?page=${this.state.currentPage-1}`} overRideClass={classes.prevNextLink}>
                        &larr;
                    </PaginationLink>
                }
                <PaginationLink pathName={this.state.pathName} search={`?page=${this.state.firstPage}`}>
                    {this.state.firstPage}
                </PaginationLink>
            </React.Fragment>
        );
    };

    paginationCenterBlock = (firstPage, currentPage, totalPages, pathName) => {
        let middleContainer = null;

        if (currentPage === firstPage) {
            let links = this.frameContinousLinks(firstPage + 1, firstPage + 4, pathName);
            middleContainer = this.postitionPlaceHolder('right', links);
        } else if (currentPage === totalPages) {
            let links = this.frameContinousLinks(totalPages - 4, totalPages - 1, pathName);
            middleContainer = this.postitionPlaceHolder('left', links);
        }  else if (currentPage - firstPage <= 3) {
            let links = this.frameContinousLinks(firstPage + 1, firstPage + 4, pathName);
            middleContainer = this.postitionPlaceHolder('right', links);
        } else if (totalPages - currentPage <= 3) {
            let links = this.frameContinousLinks(totalPages - 4 , totalPages - 1, pathName);
            middleContainer = this.postitionPlaceHolder('left', links);
        } else {
            let links = this.frameContinousLinks(currentPage - 1, currentPage + 1, pathName);
            middleContainer = this.postitionPlaceHolder('center', links);
        };

        return (
            <React.Fragment>
                {middleContainer}
            </React.Fragment>
        );
    };

    frameContinousLinks = (start, end, pathName) => {
        let links = [];
        for(var i = start; i <= end; i++) {
            links.push(
                <PaginationLink pathName={pathName} search={`?page=${i}`} key={i}>
                    {i}
                </PaginationLink>
            )
        };

        return links;
    }

    postitionPlaceHolder = (pos = 'center', links) => {
        let placeHolder = (<div>....</div>);
        switch (pos) {
            case 'right':
                return (
                    <React.Fragment>
                        {links}
                        {placeHolder}
                    </React.Fragment>
                );
            case 'left':
                return (
                    <React.Fragment>
                        {placeHolder}
                        {links}
                    </React.Fragment>
                );
            default:
                return (
                    <React.Fragment>
                        {placeHolder}
                        {links}
                        {placeHolder}
                    </React.Fragment>
                );
        }
    }

    paginationEndBlock = () => {
        return (
            <React.Fragment>
                <PaginationLink pathName={this.state.pathName} search={`?page=${this.state.totalPages}`}>
                    {this.state.totalPages}
                </PaginationLink>
                {   this.state.currentPage < this.state.totalPages &&
                    <PaginationLink pathName={this.state.pathName} search={`?page=${this.state.currentPage+1}`} overRideClass={classes.prevNextLink}>
                       &rarr; 
                    </PaginationLink>
                }
            </React.Fragment>
        );
    };

    static getDerivedStateFromProps(props, state) {
        let {pathName, type, currentPage, totalPages} = {...props};

        if (currentPage !== state.currentPage || totalPages !== state.totalPages) {
            return {
                pathName: pathName,
                type: type,
                currentPage: currentPage,
                totalPages: totalPages
            };
        };

        return null;
    }

    render() {
        let {firstPage, currentPage, totalPages, pathName} = this.state;
        let pagination = null;
        if (totalPages) {
            pagination = (
                <div className={classes.paginationContainer}>
                    {this.paginationStartBlock()}
                    {this.paginationCenterBlock(firstPage, currentPage, totalPages, pathName)}
                    {this.paginationEndBlock()}
                </div>
            );
        };
        return pagination;
    };
};

Pagination.propTypes = {
    pathName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number
}

export default Pagination;