import { createPortal } from "react-dom";
import css from './btn.module.css';
import { FiArrowUp } from "react-icons/fi";


const upDown = document.querySelector('#upDown');

export const BtnUandD = ({ locate, item }) => {
    //https://learn.javascript.ru/size-and-scroll-window#window-scroll
    let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);
  
    const up = () => window.scroll({ top: 0, behavior: 'smooth', });
   const down = ()=>  window.scrollBy({top: scrollHeight,behavior: "smooth" });      
   

        return createPortal(
          <button className={locate > 600 ? css.up:css.down} onClick={locate > 600 ? up:down}>
         
                {item.length > 12 && <FiArrowUp />}
               
         </button >, upDown
            
        );
    
};