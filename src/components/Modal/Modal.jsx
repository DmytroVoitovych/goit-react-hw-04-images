import { useEffect, } from "react";
import { createPortal } from "react-dom";
import css from './Modal.module.css';
const modal = document.querySelector('#modal');

export const Modal = ( {large, onClose})=> {
  
    useEffect(() => {
        window.addEventListener('keydown', funcKeyDown);
        return () => window.removeEventListener('keydown', funcKeyDown);// анонимка для отмены слежения
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
   const  funcKeyDown = e => {
            if (e.code === 'Escape' ) {
                onClose();
            }
    }
    
   const  funcClickBackdrop = e => { 
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

        return createPortal(
            <div className={css.overlay}  onClick={funcClickBackdrop}>
                <div className={css.modal}>
                    <img src={`${large[0]}`} alt={large[1]} />
                </div>
            </div>, modal
            
        );
    
};