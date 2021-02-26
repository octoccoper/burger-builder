import React from 'react';
import classes from './Modal.css';

const Modal = (props) => {
    return (
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
    );
}

export default Modal;