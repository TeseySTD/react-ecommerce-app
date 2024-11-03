import React, { useState } from 'react';
import { LoaderFunction, useLoaderData, Link } from 'react-router-dom';
import FakeStoreProvider from '../../api/fake-store-api';
import Product from '../../types/product';
import { Button, Container, Card, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDetailsLoader: LoaderFunction = async (params: any) => {
  const id = parseInt(params.params.productId);
  const product = await FakeStoreProvider.getProductById(id);
  if (!product) throw new Response('Product not found', { status: 404 });
  return product;
};

const ProductDetails = () => {
  const product = useLoaderData() as Product;
  const [inCart, setInCart] = useState(false);
  const [inFavorites, setInFavorites] = useState(false);

  const handleAddToCart = () => {
    // Logic to add product to cart
    setInCart(true);
  };

  const handleAddToFavorites = () => {
    // Logic to add product to favorites
    setInFavorites(true);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://placehold.co/50';
  };

  return (
    <Container className="my-auto">
      <Card className="p-4 shadow-sm">
        <div className="d-flex">
          {/* Product Image */}
          <div className="me-4">
            <Card.Img
              variant="top"
              src={product.images[0]}
              alt={product.title}
              onError={handleImageError}
              style={{ width: '30rem'}}
            />
          </div>

          {/* Product Info and Actions */}
          <div className="flex-grow-1">
            <Card.Body className='d-flex flex-column'>
              <Card.Title className="fw-bold fs-3">{product.title}</Card.Title>
              <Badge bg="secondary" className="mb-3 me-auto fs-6">
                {product.category.name}
              </Badge>
              <Card.Text className="text-muted fs-5 mb-3">
                {product.description}
              </Card.Text>
              <h4 className="fw-bold">Price: ${product.price}</h4>

              <div className="mt-4">
                <h5 className="text-success">In Stock</h5>
              </div>

              {/* Action Buttons */}
              <div className="mt-2 d-flex gap-2">
                <Button
                  variant={inCart ? 'success' : 'dark'}
                  onClick={handleAddToCart}
                  disabled={inCart}
                >
                  {inCart ? 'Added to Cart' : 'Add to Cart'}
                </Button>
                <Button
                  variant={inFavorites ? 'warning' : 'info'}
                  onClick={handleAddToFavorites}
                  disabled={inFavorites}
                >
                  {inFavorites ? 'Added to Favorites' : 'Add to Favorites'}
                </Button>
              </div>
              <div className='mt-auto'>
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