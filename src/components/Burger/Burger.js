import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = ( props ) => {

    const transformedIngridients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i) => {
            <BurgerIngredient key={igKey + i} type={igKey} />
        });
    })
        return (
            <div className={classes.Burger}>
                <BurgerIngredient type="bread-top" />
                <BurgerIngredient type="bread-bottom" />
            </div>
        );
}

export default burger;