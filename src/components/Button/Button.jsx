import  css  from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ click, status }) => {
    return <button type="submit" className={css.button} onClick={() => click()}>Upload more</button>
}; 

Button.propTypes = {
    click: PropTypes.func.isRequired,
}