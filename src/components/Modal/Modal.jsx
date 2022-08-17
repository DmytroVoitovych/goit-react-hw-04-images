import { Component } from "react";
import { createPortal } from "react-dom";
import css from './Modal.module.css';
const modal = document.querySelector('#modal');

export class Modal extends Component {
    
       
    componentDidMount() {
        window.addEventListener('keydown',this.funcKeyDown );
    }
    
    componentWillUnmount() {
     window.removeEventListener('keydown', this.funcKeyDown);
             
    }

    funcKeyDown = e => {
            if (e.code === 'Escape' ) {
                // console.log('esc');
                this.props.onClose();
            }
    }
    
    funcClickBackdrop = e => { 
        if (e.target === e.currentTarget) {
            console.log('click back');
            this.props.onClose();
        }
    };


    render() {
        console.log('работает');
        console.log(this.props.large);
        return createPortal(
            <div className={css.overlay}  onClick={this.funcClickBackdrop}>
                <div className={css.modal}>
                    <img src={`${this.props.large[0]}`} alt={this.props.large[1]} />
                </div>
            </div>, modal
            
        );
    };
};