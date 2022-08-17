import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';


export const ImageGallery = ({item, modal, status}) => {
                           
  return (
     <ul className={css.gallery}>
      {<ImageGalleryItem hits={item} modal={modal} status={status} />}
    </ul>
  );
           };
    
