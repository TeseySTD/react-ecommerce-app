const AppHeader = () => {
  return (
    <nav className="layout-nav-element navbar navbar-expand-lg sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand mx-3 ms-4 fw-bold" href="/">
          E-Commerce App
        </a>
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
              <a className="nav-link fw-bold" href="/">
                Home
              </a>
            </li>
            <li className="nav-item mx-3">
              <a className="nav-link fw-bold" href="/products">
                Products
              </a>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item mx-3">
              <a className="nav-link fw-bold" href="/cart">
                Cart
              </a>
            </li>
            <li className="nav-item mx-3 me-4">
              <a className="nav-link fw-bold" href="/favorites">
                Favorites
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AppHeader;
