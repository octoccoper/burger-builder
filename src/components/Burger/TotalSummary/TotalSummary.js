import React from 'react';
import Aux from '../../../hoc/Aux';
import classes from './TotalSummary.css'
import Button from '../../UI/Button/Button';

const TotalSummary = (props) => {

    const ingredients = Object.keys(props.ingredients)
    .map(igKey => {
        return (
        <li key={igKey}>
            <span className={classes.IngredientName}>{igKey}</span>
            : {props.ingredients[igKey]}
        </li>);
    });

    return (
        <Aux>
            <p className={classes.TotalHeading}>Your order</p>
            <p>A delicious burger with following ingredients:</p>   
            <ol className={classes.TotalList}>
                {ingredients}
            </ol>

            <p className={classes.Total}>Total is: {props.total}</p>

            <p>Do you want to continue Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>Checkout</Button>
        </Aux>
    );
}

export default TotalSummary;