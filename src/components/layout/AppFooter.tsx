const AppFooter = () => {
  return (
    <footer className="layout-nav-element d-flex flex-wrap justify-content-between align-items-center border-top footer sticky-bottom mb-0">
      <p className="col-md-4 mb-0  ms-5">© 2024 CHNU Students project.</p>
      <div className="col-md-4 d-flex align-items-center justify-content-end me-5">
        <h5 className="me-2">Authors:</h5>
        <ul className="nav flex-column text-center">
          <li className="nav-item mb-1">
            <a href="https://github.com/TeseySTD" className="nav-link p-0">
              Skoreyko Misha (343-Б)
            </a>
          </li>
          <li className="nav-item mb-1">
            <a
              href="https://github.com/ChobotarCostyantin"
              className="nav-link p-0 "
            >
              Chobotar Costyantin (343-Б)
            </a>
          </li>
          <li className="nav-item mb-1">
            <a href="https://github.com/C0ldarm" className="nav-link p-0 ">
              Nykolaychuk Vladyslav (343-Б)
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default AppFooter;
