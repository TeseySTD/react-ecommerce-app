import { Button } from 'react-bootstrap';
import Pagination from '../components/products/Pagination';
import StorageService from '../utils/storage-service';
import { useEffect, useState } from 'react';
import noFavorites from '../assets/no-favorites.png';
import { Link, useLoaderData } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState(StorageService.getFavorites());
  const isEmpty = favorites.length === 0;

  return (
    <div className="d-flex flex-column align-items-center justify-content-center my-auto">
      {isEmpty ? (
        <div className="d-flex flex-column align-items-center pb-5 mb-5">
          <img src={noFavorites} alt="No favorites" className="w-50" />
          <h1 className="fw-bold text-black mt-5">No products in favorites</h1>
          <h4>Add products to your favorites</h4>
          <Link to="/products" className="btn btn-outline-dark btn-lg mt-3">
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-4 text-center">
            <h2 className="display-3 fw-bold text-black">Your Favorites</h2>
            <h3 className="text-secondary mb-3">Favorite Products</h3>
            <Button className="mb-2" variant="secondary" onClick={() => {
              setFavorites([]); 
              StorageService.setFavorites([]);
              }}>
              Clear Favorites
            </Button>
          </div>
          <div className="d-flex flex-column align-items-center mb-3">
            <Pagination products={favorites} pageSize={4} />
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
