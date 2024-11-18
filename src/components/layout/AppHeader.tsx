import { Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <nav className="layout-nav-element navbar navbar-expand-lg sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand mx-3 ms-4 fw-bold" to="/">
          E-Commerce App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-3">
              <Link to="/" className="nav-link fw-bold">
                Home
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link to="/products" className="nav-link fw-bold">
                Products
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item mx-3">
              <Link to="/cart" className="nav-link fw-bold">
                Cart
              </Link>
            </li>
            <li className="nav-item mx-3 me-4">
              <Link to="/favorites" className="nav-link fw-bold">
                Favorites
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AppHeader;
