import { useLoaderData, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FakeStoreProvider from '../api/fake-store-api';
import Product from '../types/product';
import ProductCard from '../components/products/ProductCard';
import { Row, Form, Button } from 'react-bootstrap';
import Category from '../types/category';

const _inputDelay = 150; // ms

// Loader to fetch products
const ProductsLoader = async () => {
  const categories = await FakeStoreProvider.getCategories();
  const products = await FakeStoreProvider.getProducts();
  return { products, categories };
};

const Products = () => {
  const products = useLoaderData() as Product[];
  const categories = useLoaderData() as Category[];

  // Use search params for managing URL query parameters
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageSize, setPageSize] = useState(18);

  // Initialize filter states from URL parameters
  const initialFilterTitle = searchParams.get('title') || '';
  const initialFilterPrice = searchParams.get('price') || '';

  // Initialize state, only set from URL once on load

  const [filterTitle, setFilterTitle] = useState(initialFilterTitle);
  const [filterPrice, setFilterPrice] = useState(initialFilterPrice);

  // State for handling the timer
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  // Apply filtering based on query parameters
  const filteredProducts = products.filter((product: Product) => {
    return (
      (!filterTitle ||
        product.title.toLowerCase().includes(filterTitle.toLowerCase())) &&
      (!filterPrice || product.price <= parseFloat(filterPrice))
    );
  });

  // Pagination
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const totalPages =
    Math.ceil(filteredProducts.length / pageSize) === 0
      ? 1
      : Math.ceil(filteredProducts.length / pageSize);

  const lastIndex = currentPage * pageSize;
  const firstIndex = lastIndex - pageSize;
  const currentProducts = filteredProducts.slice(firstIndex, lastIndex);

  // Function to handle URL updates
  const handleFilterUpdate = (title: string, price: string) => {
    const params: any = { page: '1' };
    if (title) params.title = title;
    if (price) params.price = price;
    setSearchParams(params);
  };

  // Handle input change for title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Clear the existing timer and set a new one
    if (timer) clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        handleFilterUpdate(newValue, filterPrice); // Use the latest title and current price
        setFilterTitle(newValue);
      }, _inputDelay)
    ); // delay
  };

  // Handle input change for price
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Clear the existing timer and set a new one
    if (timer) clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        handleFilterUpdate(filterTitle, newValue); // Use the latest price and current title
        setFilterPrice(newValue);
      }, _inputDelay)
    ); //  delay
  };

  // Sync filter inputs with query parameters from the URL on page load
  useEffect(() => {
    setFilterTitle(searchParams.get('title') || '');
    setFilterPrice(searchParams.get('price') || '');
  }, [searchParams]);

  // Handlers for pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        page: (currentPage + 1).toString()
      });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        page: (currentPage - 1).toString()
      });
    }
  };

  // Handle no products found or empty state
  if (products === undefined || products.length === 0)
    throw new Response('No products found', {
      status: 500,
      statusText: 'No products found'
    });

  return (
    <>
      {/* Filter Form */}
      <Form className="my-4 d-flex justify-content-center">
        <div className="d-flex flex-row align-items-center justify-content-evenly w-50">
          <div className="d-flex flex-column">
            <Form.Group
              controlId="filterTitle"
              className="d-flex flex-row align-items-center"
            >
              <Form.Label className="text-nowrap mb-0 me-4">
                Filter by Title
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product title"
                onChange={handleTitleChange} // Directly use the handler
              />
            </Form.Group>
          </div>
          <div className="d-flex flex-column">
            <Form.Group
              controlId="filterPrice"
              className="d-flex flex-row align-items-center"
            >
              <Form.Label className="text-nowrap mb-0 me-4">
                Filter by Price (max)
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter max price"
                onChange={handlePriceChange} // Directly use the handler
                min={1}
              />
            </Form.Group>
          </div>
          <div className="d-flex flex-column">
            <Button
              variant="secondary"
              onClick={() => {
                setFilterTitle('');
                setFilterPrice('');
                setSearchParams({ page: '1' }); // Reset the URL parameters
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </Form>

      {/* Product List */}
      <Row className="d-flex justify-content-center mb-4">
        {currentProducts.length > 0 ? (
          currentProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <h3 className="text-center mt-5">No products match your filters.</h3>
        )}
      </Row>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center my-4 mt-auto">
        <Button
          variant="secondary"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          Previous
        </Button>
        <span className="mx-3 align-self-center">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="secondary"
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export { ProductsLoader };
export default Products;
