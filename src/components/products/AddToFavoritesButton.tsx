import { useRef, useState } from 'react';
import StorageService from '../../utils/storage-service';
import favorite from '../../assets/heart-thin-icon.svg';
import favoriteFill from '../../assets/heart-icon.svg';
import Product from '../../types/product';

interface AddToFavoritesButtonProps {
  product: Product;
}

const AddToFavoritesButton = (props: AddToFavoritesButtonProps) => {
  const [inFavorites, setInFavorites] = useState(
    StorageService.isFavorite(props.product.id)
  );

  const refFavorites = useRef<HTMLDivElement>(null);

  const handleAddToFavorites = () => {
    if (inFavorites) {
      StorageService.removeFavorite(props.product.id);
      setInFavorites(false);
    } else {
      StorageService.addFavorite(props.product);
      setInFavorites(true);
    }
  };

  const animationHandler = () =>{
    if(refFavorites.current && !refFavorites.current.classList.contains('animated')){
      refFavorites.current.classList.toggle('animated');

      setTimeout(() => {
        refFavorites.current?.classList.toggle('animated');
      },300)
    }
  };

  return (
    <div className="add-favorites-button d-flex" onClick={handleAddToFavorites} onMouseOver={animationHandler} ref={refFavorites}>
      {inFavorites ? (
        <img src={favoriteFill} alt="" style={{ width: '2rem' }} />
      ) : (
        <img src={favorite} alt="" style={{ width: '2rem' }} />
      )}
    </div>
  );
};

export default AddToFavoritesButton;
