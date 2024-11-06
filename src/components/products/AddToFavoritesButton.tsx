import { useState } from 'react';
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
  const handleAddToFavorites = () => {
    if (inFavorites) {
      StorageService.removeFavorite(props.product.id);
      setInFavorites(false);
    } else {
      StorageService.addFavorite(props.product);
      setInFavorites(true);
    }
  };

  return (
    <a className="d-flex" onClick={handleAddToFavorites}>
      {inFavorites ? (
        <img src={favoriteFill} alt="" style={{ width: '2rem' }} />
      ) : (
        <img src={favorite} alt="" style={{ width: '2rem' }} />
      )}
    </a>
  );
};

export default AddToFavoritesButton;
