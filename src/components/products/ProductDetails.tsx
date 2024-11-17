import { LoaderFunction, useLoaderData, Link } from 'react-router-dom';
import FakeStoreProvider from '../../api/fake-store-api';
import Product from '../../types/product';
import { Container, Card, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddToFavoritesButton from './AddToFavoritesButton';
import CardImage from './CardImage';
import AddToCartButton from './AddToCartButton';

const ProductDetailsLoader: LoaderFunction = async (params: any) => {
  const id = parseInt(params.params.productId);
  const product = await FakeStoreProvider.getProductById(id);
  if (!product) throw new Response('Product not found', { status: 404 });
  return product;
};

const ProductDetails = () => {
  const product = useLoaderData() as Product;

  return (
    <Container className="my-auto">
      <Card className="p-4 shadow-sm">
        <div className="d-flex">
          {/* Product Image */}
          <div className="me-4">
            <CardImage
              name={product.title}
              images={product.images}
              style={{ width: '30rem' }}
            />
          </div>

          {/* Product Info and Actions */}
          <div className="flex-grow-1">
            <Card.Body className="d-flex pb-0 h-100 flex-column">
              <Card.Title className="fw-bold fs-3">{product.title}</Card.Title>
              <Badge bg="secondary" className="mb-3 me-auto fs-6">
                {product.category.name}
              </Badge>
              <Card.Text className="text-muted fs-5 mb-3">
                {product.description}
              </Card.Text>
              <h4 className="fw-bold">Price: ${product.price}</h4>
              <div className="mt-1">
                <h5 className="text-success">In Stock</h5>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto me-2 d-flex justify-content-between">
                <AddToCartButton product={product} quantity={1} />
                <AddToFavoritesButton product={product} />
              </div>
              <div>
                <Link to="/" className="btn btn-outline-secondary w-100 mt-3">
                  Back to Products
                </Link>
              </div>
            </Card.Body>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export { ProductDetailsLoader };
export default ProductDetails;
