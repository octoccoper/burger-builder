import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import TotalSummary from '../../components/Burger/TotalSummary/TotalSummary';
import axios from '../../libs/axios/axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    cheese: 0.6,
    salad: 0.8,
    bacon: 1.3,
    meat: 1.19
};

class BurgerBuilder extends Component {

state = {
    ingredients: null,
    totalPrice: 2,
    purchasable: false,
    purchasing: false,
    loading: false
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
    const updatedPrice = Number((currentTotal + addedPrice).toFixed(2));

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
    const updatedPrice = Number((currentTotal - deductedPrice).toFixed(2));

    this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
    this.updatePurchaseState(updatedIngredients);
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

purchaseHandler = () => {
    this.setState({purchasing: true});
}

hideModal = () => {
    this.setState({purchasing: false});
}

purchaseContinueHandler = () => {
    const order = {
        ingredients: this.state.ingredients,

        total: this.state.totalPrice,

        customer: {
            name: 'Test Name',
            address: { 
                street: 'Test street 1',
                zipCode: '12345',
                country: 'Germany'
            },
            email: 'test@email.com',
            phone: '0502356695'
        },

        deliveryMethod: 'Nova Poshta'
    }

    this.setState({loading: true});

    axios.post('/orders.json',order)
    .then(response => {
        console.log("[BurgerBuilder.js] post order data, response:", response);
         this.setState({loading: false, purchasing: false});
    })
    .catch(error => {
        console.log("[BurgerBuilder.js] post order data, error:", error);
         this.setState({loading: false, purchasing: false});
    });

}

componentDidMount () {
    axios.get('/ingredients.json')
    .then(response => {
        console.log("[BurgerBuilder.js] get ingredients, response:", response);
        this.setState({ingredients: response.data});
    })
    .catch(error => {
        console.log("[BurgerBuilder.js] get ingredients, error:", error);
         this.setState({loading: false, purchasing: false});
    });


}

render() {
    const disabledInfo = {
        ...this.state.ingredients
    }

    let burgerContainer = <Spinner/>;

    let totalSummary = null;


        for(let key in disabledInfo) {
            disabledInfo[key] === 0 ? 
                disabledInfo[key] = true : 
                disabledInfo[key] = false;
        }

        if ( this.state.ingredients ) {
            burgerContainer =(
                <Aux>
                <Burger ingredients={this.state.ingredients}/>            
                <BuildControls 
                    addedIngredients={this.addIngredientHandler}
                    removedIngredients={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler} />
                </Aux>);

                totalSummary = (<TotalSummary 
                                ingredients={this.state.ingredients}
                                total={this.state.totalPrice}
                                purchaseCancelled={this.hideModal}
                                purchaseContinued={this.purchaseContinueHandler}/>);
    }

    if( this.state.loading ) {
        totalSummary = <Spinner/>;
    }

    return (
        <Aux>
            <Modal 
                show={this.state.purchasing}
                closing={this.hideModal}>
               { totalSummary }
            </Modal>

            { burgerContainer }
        </Aux>
    );
}
}

export default withErrorHandler(BurgerBuilder, axios);