import { useEffect, useState } from 'react';
import StorageService from '../utils/storage-service';
import emptyCart from '../assets/empty-cart.png';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [products, setProducts] = useState(StorageService.getCart());
  const isEmpty = products.length === 0;

  useEffect(() => {
    setProducts(StorageService.getCart());
  }, [products]);

  return (
    <div className="d-flex text-center justify-content-center mb-auto">
      <div className="p-5">
        {!isEmpty ? (
          <div className="d-flex flex-column align-items-center">
            <img src={emptyCart} alt="" className="w-50" />
            <h1 className="fw-bold text-black mt-5">Your cart is empty</h1>
            <h4>Add products to your cart</h4>
            <Link to="/products" className="btn btn-outline-dark btn-lg mt-3">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="mt-1">
            <h3 className="fw-bold text-black">Your shopping cart</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
