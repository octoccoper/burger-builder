import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

state = {
    ingredients: {
        cheese: 2,
        salad: 3,
        bacon: 1,
        meat: 2
    }
};

    render() {
        return (
            <Aux>
                <div>
                    <Burger ingredients={this.state.ingredients}/>
                </div>
                <div>Build Controls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;