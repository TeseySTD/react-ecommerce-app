import { Link } from 'react-router-dom';
import Product from '../../types/product';
import { Badge, Button, Col } from 'react-bootstrap';
import CardImage from './CardImage';
import AddToFavoritesButton from './AddToFavoritesButton';

interface ProductCardProps {
  product: Product;
}

const ProductCard = (props: ProductCardProps) => {
  return (
    <div className="card p-3 m-2" style={{ width: '20rem' }}>
      <div className="favorites-position">
        <AddToFavoritesButton product={props.product} />
      </div>
      <CardImage name={props.product.title} images={props.product.images} />
      <div className="card-body px-1 pb-1 d-flex flex-column">
        <h6 className="card-title text-black">{props.product.title}</h6>
        <Badge bg="secondary" className="mb-1 me-auto fs-6">
          {props.product.category.name}
        </Badge>
        <p className="card-text mb-4 text-muted">
          Price: ${props.product.price}
        </p>
        <div className="mt-auto">
          <Link
            to={`/react-ecommerce-app/products/${props.product.id}`}
            className="btn btn-outline-dark btn-sm w-100"
          >
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
