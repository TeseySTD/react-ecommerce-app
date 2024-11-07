import { useEffect, useState } from 'react';
import StorageService from '../utils/storage-service';
import emptyCart from '../assets/empty-cart.png';
import { Link } from 'react-router-dom';
import Product from '../types/product';
import AddToCartButton from '../components/products/AddToCartButton';
import { Button } from 'react-bootstrap';

const Cart = () => {
  const [products, setProducts] = useState(StorageService.getCart());
  const isEmpty = products.length === 0;

  useEffect(() => {
    setProducts(StorageService.getCart());
  }, [products]);

  const handleCheckout = () => {
    // Logic to handle checkout
  };

  return (
    <div className="d-flex text-center justify-content-center mb-auto">
      <div className="p-5 w-100">
        {isEmpty ? (
          <div className="d-flex flex-column align-items-center mt-5">
            <img src={emptyCart} alt="" style={{ width: '20rem' }} />
            <h1 className="fw-bold text-black mt-5">Your cart is empty</h1>
            <h4>Add products to your cart</h4>
            <Link to="/products" className="btn btn-outline-dark btn-lg mt-3">
              Shop Now
            </Link>
          </div>
        ) : (
          <>
            <h3 className="fw-bold text-black mb-4">Your shopping cart</h3>
            <div className="mt-1 d-flex flex-row justify-content-evenly">
              <div className="container m-0">
                <table className="table text-light rounded border border-secondary m-0">
                  <thead className="table-dark">
                    <tr>
                      <th className="fw-bold text-start p-3 ps-4">Product</th>
                      <th className="fw-bold p-3">Category</th>
                      <th className="fw-bold p-3">Price</th>
                      <th className="fw-bold p-3">Quantity</th>
                      <th className="fw-bold p-3">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product: Product) => (
                      <tr className="align-middle" key={product.id}>
                        <td className="text-start ps-4">{product.title}</td>
                        <td>{product.category.name}</td>
                        <td>${product.price}</td>
                        <td className="">
                          <AddToCartButton product={product} />
                        </td>
                        {/* Сума продуктів по їх кількості */}
                        <td>${product.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Checkout menu */}
              <div className="my-auto" style={{ width: '300px' }}>
                <div className="p-4 text-light bg-dark rounded">
                  {/* Тут буде загальна сума та кількість продуктів */}
                  <h5 className="text-start fw-bold m-3">Order Total: </h5>
                  <h5 className="text-start fw-bold m-3">Sales Volume: </h5>
                  <Button
                    variant="light"
                    onClick={handleCheckout}
                    className="mt-3 w-100"
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
