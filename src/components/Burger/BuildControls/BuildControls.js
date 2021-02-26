import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

const BuildControls = (props) => {
    return (
        
        <div className={classes.BuildControls}>
            <p className={classes.BuildPrice}>Current price: {props.price}</p>
            {
                controls.map(control => (
                    <BuildControl 
                        added={() => props.addedIngredients(control.type)} 
                        removed={() => props.removedIngredients(control.type)} 
                        key={control.label} 
                        label={control.label}
                        disabled={props.disabled[control.type]}
                    />
            ))
            }
            <button 
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>
                    Order Now
            </button> 
        </div>
    );
}

export default BuildControls;