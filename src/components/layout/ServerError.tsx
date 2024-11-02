import React from 'react';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './NotFound';

const ServerError = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) 
      return <NotFound/>
    const message = error.statusText || 'Error';
    return (
      <div className="d-flex text-center align-items-center justify-content-center ">
        <div className="p-5">
          <h1 className="display-1 fw-bold text-black">{error.status}</h1>
          <h2 className="mb-3 text-secondary">{message}</h2>
          <p className="lead text-muted mb-4">
            Oops! Error raised. Please try again later.
          </p>
          <Link to="/" className="btn btn-outline-dark btn-lg">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
  throw error;
};

export default ServerError;
