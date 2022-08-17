import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({hits, modal}) => {
    return (       
        hits.map(hit => 
            <li key={hit.id} className={css['gallery-item']}>
            <img  src={hit.webformatURL} alt={hit.tags}  onClick={(e)=>modal(e, hit.largeImageURL, hit.tags)} loading='lazy' />
        </li>)       
    );
    
};
 
ImageGalleryItem.propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    modal: PropTypes.func.isRequired,
}