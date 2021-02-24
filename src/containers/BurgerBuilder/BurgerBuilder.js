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
        cheese: 0,
        salad: 0,
        bacon: 0,
        meat: 0
    },
    totalPrice: 2,
    purchasable: false
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
    this.updatePurchaseState(updatedIngredients);
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
    this.updatePurchaseState(updatedIngredients);
}

formatPrice = (price) => {
    const newPrice = price.toFixed(2) + '$';
    return newPrice;
}

updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
    .map(igKey => {
        return ingredients[igKey];
    })
    .reduce((sum, el) => {
        return sum + el;
    },0);
    
    this.setState({purchasable: sum > 0});
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
                    purchasable={this.state.purchasable}
                    />
            </Aux>
        );
    }
}

export default BurgerBuilder;