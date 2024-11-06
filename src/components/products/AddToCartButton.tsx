import { useState } from 'react';
import StorageService from '../../utils/storage-service';
import Product from '../../types/product';
import { Button } from 'react-bootstrap';

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton = (props: AddToCartButtonProps) => {
  const [inCart, setInCart] = useState(
    StorageService.isCartItem(props.product.id)
  );
  const [quantity, setQuantity] = useState(0);

  // TODO: Кароч зробиш логіку додавання в local storage... і видалення
  const handleAddToCart = () => {
    // Logic to add product to cart
    setInCart(true);
    setQuantity(quantity + 1);
  };

  const handleRemoveFromCart = () => {
    // Logic to remove product from cart
    setQuantity(quantity - 1);
    if (quantity === 1) {
      setInCart(false);
    }
  };

  return (
    <>
      {inCart ? (
        <div className="d-flex flex-row align-items-center">
          <Button
            variant="primary"
            id="minus-button"
            onClick={handleRemoveFromCart}
            style={{ width: '40px' }}
          >
            <p className="m-0 p-0">-</p>
          </Button>
          {/* TODO: прив'яжи quantity до кількості продуктів з певним id в local storage */}
          <span className="mb-0 mx-2 border border-2 rounded py-1 px-3">
            {quantity}
          </span>
          <Button
            variant="primary"
            id="plus-button"
            onClick={handleAddToCart}
            style={{ width: '40px' }}
          >
            <p className="m-0 p-0">+</p>
          </Button>
        </div>
      ) : (
        <Button variant="dark" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      )}
    </>
  );
};

export default AddToCartButton;
