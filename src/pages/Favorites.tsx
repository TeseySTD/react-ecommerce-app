import { Button } from 'react-bootstrap';
import Pagination from '../components/products/Pagination';
import StorageService from '../utils/storage-service';

const Favorites = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center mb-auto">
      <div className="mt-4 text-center">
        <h2 className="display-3 fw-bold text-black">Your Favorites</h2>
        <h3 className="text-secondary mb-3">Favorite Products</h3>
        <Button className="mb-2" variant="secondary">
          Clear Favorites
        </Button>
      </div>
      <div className="d-flex flex-column align-items-center mb-3">
        <Pagination products={StorageService.getFavorites()} pageSize={4} />
      </div>
    </div>
  );
};

export default Favorites;
