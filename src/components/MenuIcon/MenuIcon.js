import React from 'react';
import classes from './MenuIcon.css';

const menuIcon = (props) => {
    return (
        <div 
            className={[classes.MenuIcon, classes.MobileOnly].join(' ')}
            onClick={props.clicked}>
        </div>
    );
}

export default menuIcon;