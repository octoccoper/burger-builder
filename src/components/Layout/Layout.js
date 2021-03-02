import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }

    clickedMenuToggleHandler = () => {
        let toggledState = !this.state.showSideDrawer;

        this.setState({
            showSideDrawer: toggledState
        });
    }

    render () {
        return (
            <Aux>

                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerCloseHandler}/>
                <Toolbar clicked={this.clickedMenuToggleHandler}/>

                <main className={classes.Content}>
                    { this.props.children }               
                </main>
            </Aux>
        )
    }
}


export default Layout;
