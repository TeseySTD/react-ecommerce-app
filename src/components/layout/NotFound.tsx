import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import img404 from '../../assets/hollow-depressed.gif';

const NotFoundPage = () => {
  return (
    <div className="d-flex text-center align-items-center justify-content-center my-auto">
      <div className="p-5">
        <h1 className="display-1 fw-bold text-black mt-5">404</h1>
        <img src={img404} alt="" className="w-50" />
        <h2 className="mb-3 text-secondary">Page Not Found</h2>
        <p className="lead text-muted mb-4">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-outline-dark btn-lg">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
