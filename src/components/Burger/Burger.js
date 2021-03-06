import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = ( props ) => {

    let transformedIngridients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    });

    let ingredientsArr = transformedIngridients.reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue);
    });

    if(ingredientsArr.length === 0) {
        transformedIngridients = (<p>Please add any ingredients</p>)
    }

        return (
            <div className={classes.Burger}>
                <BurgerIngredient type="bread-top" />
                {transformedIngridients}
                <BurgerIngredient type="bread-bottom" />
            </div>
        );
}

export default burger;