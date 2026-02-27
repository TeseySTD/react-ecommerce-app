import { useState, useEffect } from 'react';
import StorageService from '../../utils/storage-service';
import Product, { ProductWithQuantity } from '../../types/product';
import { Button } from 'react-bootstrap';

interface AddToCartButtonProps {
  product: Product;
  quantity: number;
  setState?: React.Dispatch<React.SetStateAction<ProductWithQuantity[]>>;
  disabled?: boolean;
}

const AddToCartButton = (props: AddToCartButtonProps) => {
  const { product } = props;

  // Initial state for cart item and its quantity
  const [inCart, setInCart] = useState(StorageService.isCartItem(product.id));
  const [quantity, setQuantity] = useState(0);

  // Sync the quantity state with the local storage data
  useEffect(() => {
    if (inCart) {
      const cartItem = StorageService.getCart().find(
        (item) => item.id === product.id
      );
      setQuantity(cartItem?.quantity || 0);
    }
  }, [inCart, product.id]);

  // Update cart when the quantity is added
  const handleAddToCart = () => {
    const newQuantity = quantity + 1;
    StorageService.addCartItem({ ...product, quantity: newQuantity }); // Add or update in storage
    if(props.setState) props.setState(StorageService.getCart());
    setInCart(true);
    setQuantity(newQuantity);
  };

  // Update cart when quantity is decreased
  const handleRemoveFromCart = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      StorageService.updateCartItemQuantity(product.id, newQuantity); // Update quantity in storage
      setQuantity(newQuantity);
    } else {
      // Remove the item from cart when quantity is 1 and user tries to decrease
      StorageService.removeCartItem(product.id); // Remove from storage
      setQuantity(0);
      setInCart(false);
    }
    if(props.setState) props.setState(StorageService.getCart());
  };


  return (
    <>
      {inCart ? (
        <div className="d-flex flex-row justify-content-center align-items-center">
          <Button
            variant={quantity === 1 ? 'danger' : 'primary'}
            id="minus-button"
            onClick={handleRemoveFromCart}
            style={{ width: '40px' }}
            disabled={props.disabled}
          >
            {quantity === 1 ? (
              <p className="m-0 p-0">
                <i className="bi bi-trash"></i>
              </p>
            ) : (
              <p className="m-0 p-0">-</p>
            )}
          </Button>
          {/* Display quantity */}
          <span className="mb-0 mx-2 border border-2 rounded py-1 px-3">
            {quantity}
          </span>
          <Button
            variant="primary"
            id="plus-button"
            onClick={handleAddToCart}
            style={{ width: '40px' }}
            disabled={props.disabled}
          >
            <p className="m-0 p-0">+</p>
          </Button>
        </div>
      ) : (
        <Button variant="warning" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      )}
    </>
  );
};

export default AddToCartButton;
