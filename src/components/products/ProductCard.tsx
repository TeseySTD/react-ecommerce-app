import { Link } from 'react-router-dom';
import Product from '../../types/product';
import { Col } from 'react-bootstrap';

interface ProductCardProps {
  product: Product;
}

const ProductCard = (props: ProductCardProps) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://placehold.co/50';
  };
  return (
    <div className="card p-3 m-2" style={{ width: '20rem' }}>
      <img
        src={props.product.images[0]}
        className="card-img-top"
        alt={props.product.title}
        onError={handleImageError}
      />
      <div className="card-body px-1 pb-1 d-flex flex-column">
        <h6 className="card-title text-black">{props.product.title}</h6>
        <p className="card-text mb-2 text-muted">
          Price: ${props.product.price}
        </p>
        <p className="card-text text-muted">{props.product.category.name}</p>
        {/* <p className="card-text text-start">{truncateText(props.product.description)}</p> */}
        <div className="mt-auto">
          <Link
            to={`/products/${props.product.id}`}
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
