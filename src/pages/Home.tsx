import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import Product from '../types/product';
import Category from '../types/category';
import FakeStoreProvider from '../api/fake-store-api';

const HomeLoader = async () => {
  const products = await FakeStoreProvider.getPaginatedProducts(5, 0);
  return products;
}


const Home = () => {
  const products = useLoaderData() as Product[];

  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center">
      <div className="p-10 mt-5">
        <h1 className="display-3 fw-bold text-black">Welcome to Our Store</h1>
        <p className="lead text-muted mb-4">
          Discover our latest products and exclusive deals, curated just for
          you.
        </p>
        <Link to="/products" className="btn btn-outline-dark btn-lg mb-4">
          Shop Now
        </Link>
      </div>

      <div className="container">
        <h2 className="text-secondary mb-4">Featured Products</h2>
        <div className="row mb-3">
          {products.map((product: Product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
export { HomeLoader };
export default Home;
