import { Link } from 'react-router-dom';
import Product from '../../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = (props: ProductCardProps) => {
  return (
    <div className="card p-3 ms-3 mt-3 mb-5" style={{ width: '15rem' }}>
      <img
        src={props.product.images[0]}
        className="card-img-top"
        alt={props.product.title}
      />
      <div className="card-body">
        <h5 className="card-title text-black">{props.product.title}</h5>
        <p className="card-text text-muted">${props.product.price}</p>
        <p className="card-text text-muted">{props.product.category.name}</p>
        <p className="card-text text-start">{truncateText(props.product.description)}</p>
        <Link
          to={`/products/${props.product.id}`}
          className="btn btn-outline-dark btn-sm"
        >
          View Product
        </Link>
      </div>
    </div>
  );
};

function truncateText(text: string) {
  var truncated = text.substring(0, 75) + "...";
  return truncated;
}


export default ProductCard;
