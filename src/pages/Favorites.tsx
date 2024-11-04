import React from 'react';
import Product from '../types/product';
import ProductCard from '../components/products/ProductCard';
import FakeStoreProvider from '../api/fake-store-api';

const Favorites = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center mb-auto">
      <div className="mt-4 text-center">
        <h2 className="display-3 fw-bold text-black">Your Favorites</h2>
        <h3 className="text-secondary mb-3">Favorite Products</h3>
      </div>
      <div className="container d-flex flex-column align-items-center mb-3"></div>
    </div>
  );
};

export default Favorites;
