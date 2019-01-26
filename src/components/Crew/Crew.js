import React from 'react';
import classes from './Crew.module.css';

const crew = (props) => {
    let { title, crewList } = props;

    let crew = null;
    if (crewList.length > 0) {
        crew = (
            <div className={classes.crewContainer}>
                <h4 className={classes.crewTitle}>
                    {crewList.length > 1 ? `${title}s` : title }
                </h4>
                <ul>
                    {   
                        crewList.map(crew => {
                            return <li key={crew.name} className={classes.crewListItem}>{crew.name}</li>;
                        })
                    }
                </ul>
            </div>
        );
    };

    return crew;
}

export default crew;