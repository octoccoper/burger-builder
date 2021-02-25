import React from 'react';
import Aux from '../../../hoc/Aux';
import classes from './TotalSummary.css'

const TotalSummary = (props) => {

    const ingredients = Object.keys(props.ingredients)
    .map(igKey => {
        return (<li key={igKey}><span className={classes.IngredientName}>{igKey}</span>: {props.ingredients[igKey]}</li>);
    });


    return (
        <Aux>
            <p className={classes.TotalHeading}>Your order</p>
            <p>A delicious burger with following ingredients:</p>   
            <ol className={classes.TotalList}>
                {ingredients}
            </ol>
            <p>Total: {props.total}</p>
        </Aux>
    );
}

export default TotalSummary;