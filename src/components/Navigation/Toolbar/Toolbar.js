import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import MenuIcon from '../../MenuIcon/MenuIcon';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <MenuIcon clicked={props.clicked}/>
            <Logo/>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
}

export default toolbar;