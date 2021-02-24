import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
    cheese: 0.6,
    salad: 0.8,
    bacon: 1.3,
    meat: 1.19
};

class BurgerBuilder extends Component {

state = {
    ingredients: {
        cheese: 1,
        salad: 1,
        bacon: 1,
        meat: 0
    },
    totalPrice: 4
}

addIngredientHandler = ( type ) => {
    const oldAmountIngredients = this.state.ingredients[type];

    const newAmountIngredients = oldAmountIngredients + 1;

    const updatedIngredients = {
        ...this.state.ingredients
    }

    updatedIngredients[type] = newAmountIngredients;

    const currentTotal = this.state.totalPrice;
    const addedPrice = INGREDIENT_PRICES[type];
    const updatedPrice = currentTotal + addedPrice;

    this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
    console.log(updatedIngredients, updatedPrice);
}

removeIngredientHandler = ( type ) => {
    const oldAmountIngredients = this.state.ingredients[type];

    if(oldAmountIngredients === 0) {
        return;
    }

    const newAmountIngredients = oldAmountIngredients - 1;

    const updatedIngredients = {
        ...this.state.ingredients
    }

    updatedIngredients[type] = newAmountIngredients;

    const currentTotal = this.state.totalPrice;
    const deductedPrice = INGREDIENT_PRICES[type];
    const updatedPrice = currentTotal - deductedPrice;

    this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
    console.log(updatedIngredients, updatedPrice);
}

formatPrice = (price) => {
    const newPrice = price.toFixed(2) + '$';
    return newPrice;
}

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo) {
            disabledInfo[key] === 0 ? 
                disabledInfo[key] = true : 
                disabledInfo[key] = false;
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    addedIngredients={this.addIngredientHandler}
                    removedIngredients={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.formatPrice(this.state.totalPrice)}
                    />
            </Aux>
        );
    }
}

export default BurgerBuilder;