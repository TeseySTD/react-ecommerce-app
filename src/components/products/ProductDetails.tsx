import React, { useState } from 'react';
import { LoaderFunction, useLoaderData, Link } from 'react-router-dom';
import FakeStoreProvider from '../../api/fake-store-api';
import Product from '../../types/product';
import { Button, Container, Card, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import StorageService from '../../utils/storage-service';
import favorite from '../../assets/favorite-star.svg';
import favoriteFill from '../../assets/favorite-star-fill.svg';

const ProductDetailsLoader: LoaderFunction = async (params: any) => {
  const id = parseInt(params.params.productId);
  const product = await FakeStoreProvider.getProductById(id);
  if (!product) throw new Response('Product not found', { status: 404 });
  return product;
};

const ProductDetails = () => {
  const product = useLoaderData() as Product;
  const [inCart, setInCart] = useState(StorageService.isCartItem(product.id));
  const [inFavorites, setInFavorites] = useState(
    StorageService.isFavorite(product.id)
  );

  const handleAddToCart = () => {
    // Logic to add product to cart
    setInCart(true);
  };

  const handleAddToFavorites = () => {
    if (inFavorites) {
      StorageService.removeFavorite(product.id);
      setInFavorites(false);
    } else {
      StorageService.addFavorite(product);
      setInFavorites(true);
    }
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
              <div className="mt-auto me-2 d-flex gap-2">
                <Button
                  variant={inCart ? 'success' : 'dark'}
                  onClick={handleAddToCart}
                  disabled={inCart}
                >
                  {inCart ? 'Added to Cart' : 'Add to Cart'}
                </Button>
                <a className="d-flex" onClick={handleAddToFavorites}>
                  {inFavorites ? (
                    <img src={favoriteFill} alt="" style={{ width: '2rem' }} />
                  ) : (
                    <img src={favorite} alt="" style={{ width: '2rem' }} />
                  )}
                </a>
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
