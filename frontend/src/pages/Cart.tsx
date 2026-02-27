import { useEffect, useRef, useState } from 'react';
import StorageService from '../utils/storage-service';
import emptyCart from '../assets/empty-cart.png';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ProductWithQuantity } from '../types/product'; // Ensure ProductWithQuantity includes quantity
import AddToCartButton from '../components/products/AddToCartButton';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer, toast } from 'react-toastify';

const Cart = () => {
  const [products, setProducts] = useState<ProductWithQuantity[]>(
    StorageService.getCart()
  );
  const [isForOrder, setIsForOrder] = useState(false);
  const isForOrderRef = useRef(isForOrder);
  const isEmpty = products.length === 0;

  // Calculate Order Total and Sales Volume
  const orderTotal = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const salesVolume = products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  useEffect(() => {
    setProducts(StorageService.getCart());
  }, []);

  useEffect(() => {
    isForOrderRef.current = isForOrder;
  }, [isForOrder]);

  const toastCloseButton = (
    <i
      className="bi bi-x-lg"
      style={{
        cursor: 'pointer'
      }}
      onClick={() => {
        setIsForOrder(false);
        // Close the toast
        toast.dismiss()
      }}
    >
    </i>
  )

  const toastDismissHandler = () => {
    if (isForOrderRef.current) {
      // Clear cart after successful checkout
      setProducts([]);
      StorageService.setCart([]);
      setIsForOrder(false);
    }
  }

  const handleCheckout = () => {
    setIsForOrder(true);

    // Show toast notification
    toast.success('Checkout successful! You can cancel the order by clicking the X button.', {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      onClose: toastDismissHandler,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
  };


  return (
    <div className="d-flex text-center justify-content-center mb-auto">
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        closeButton={toastCloseButton}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="p-5 w-100">
        {isEmpty ? (
          <div className="d-flex flex-column align-items-center mt-5">
            <img src={emptyCart} alt="Empty Cart" style={{ width: '20rem' }} />
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
                    {products.map((product) => (
                      <tr className="align-middle" key={product.id}>
                        <td className="text-start ps-4">{product.title}</td>
                        <td>{product.category.name}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td className="">
                          <AddToCartButton
                            product={product}
                            quantity={product.quantity}
                            setState={setProducts}
                            disabled={isForOrder}
                          />
                        </td>
                        <td>
                          ${(product.price * product.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Checkout menu */}
              <div className="my-auto" style={{ width: '300px' }}>
                <div className="p-4 text-light bg-dark rounded">
                  <h5 className="text-start fw-bold m-3">
                    Order Total: ${orderTotal.toFixed(2)}
                  </h5>
                  <h5 className="text-start fw-bold m-3">
                    Sales Volume: {salesVolume}
                  </h5>
                  <Button
                    variant="light"
                    className="mt-3 w-100"
                    disabled={isForOrder}
                    onClick={() => {
                      setProducts([]);
                      StorageService.setCart([]);
                    }}
                  >
                    Clear Cart
                  </Button>
                  <Button
                    variant="light"
                    onClick={handleCheckout}
                    className="mt-3 w-100"
                    disabled={isForOrder}
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
