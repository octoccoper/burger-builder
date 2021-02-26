import React from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const Modal = (props) => {
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.closing}></Backdrop>
            <div 
                className={classes.Modal}
                style= {{
                        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }}>
            {props.children}  

            <button 
                className={classes.ModalClose}
                onClick={props.closing}>
                Close
            </button>

            </div>
        </Aux>
    );
}

export default Modal;