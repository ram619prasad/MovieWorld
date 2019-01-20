import React from 'react';

import classes from './CircularProgress.module.css';

const circularProgress = (props) => {
    const sqSize = 50;
    const viewBox = `0 0 ${sqSize} ${sqSize}`;

    const strokeWidth = 5;
    const percentage = props.percentage || 0;

    const radius = (sqSize - strokeWidth) / 2;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - dashArray * percentage / 100;
  
    return (
        <svg
            width={sqSize}
            height={sqSize}
            viewBox={viewBox}>
            <circle
                className={classes.circleBackground}
                cx={sqSize / 2}
                cy={sqSize / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`} />
            <circle
                className={classes.circleProgress}
                cx={sqSize / 2}
                cy={sqSize / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
                transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
                style={{
                    strokeDasharray: dashArray,
                    strokeDashoffset: dashOffset
                }} />
            <text
                className={classes.circleText}
                x="50%"
                y="50%"
                dy=".2em"
                textAnchor="middle">
                {`${percentage}%`}
            </text>
        </svg>
    );
};

export default circularProgress;