import { useLoaderData, useSearchParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import FakeStoreProvider from '../api/fake-store-api';
import Product from '../types/product';
import Pagination from '../components/products/Pagination';
import { Form, Button } from 'react-bootstrap';
import Category from '../types/category';

const _inputDelay = 150; // ms

// Loader to fetch products
const ProductsLoader = async () => {
  const categories = await FakeStoreProvider.getCategories();
  const products = await FakeStoreProvider.getProducts();
  return { products, categories };
};

const Products = () => {
  const loaderData = useLoaderData() as {
    products: Product[];
    categories: Category[];
  };
  const products = loaderData.products as Product[];
  const categories = loaderData.categories as Category[];

  // Use search params for managing URL query parameters
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageSize] = useState(10);

  // Initialize filter states from URL parameters
  const initialFilterTitle = searchParams.get('title') || '';
  const initialFilterPrice = searchParams.get('price') || '';

  // Initialize state, only set from URL once on load
  const [filterTitle, setFilterTitle] = useState(initialFilterTitle);
  const [filterPrice, setFilterPrice] = useState(initialFilterPrice);

  // State for handling the timer
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  // Ref for the filter form
  const filterFormRef = useRef<HTMLFormElement>(null);

  // Apply filtering based on query parameters
  const filteredProducts = products.filter((product: Product) => {
    return (
      (!filterTitle ||
        product.title.toLowerCase().includes(filterTitle.toLowerCase())) &&
      (!filterPrice || product.price <= parseFloat(filterPrice))
    );
  });

  // Function to handle URL updates
  const handleFilterUpdate = (title: string, price: string) => {
    const params: any = {};
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

  // Handle no products found or empty state
  if (products === undefined || products.length === 0)
    throw new Response('No products found', {
      status: 500,
      statusText: 'No products found'
    });

  return (
    <>
      {/* Filter Form */}
      <Form className="my-4 d-flex justify-content-center" ref={filterFormRef}>
        <div className="d-flex flex-row align-items-center justify-content-center w-75">
          <div className="d-flex flex-column mx-4">
            <Form.Select>
              {categories.map((category: Category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="d-flex flex-column mx-2">
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
          <div className="d-flex flex-column mx-2">
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
                min={1}
                onChange={handlePriceChange} // Directly use the handler
              />
            </Form.Group>
          </div>
          <div className="d-flex flex-column mx-4">
            <Button
              variant="secondary"
              onClick={() => {
                setFilterTitle('');
                setFilterPrice('');
                filterFormRef.current?.reset();
                setSearchParams({}); // Reset the URL parameters
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </Form>

      {/* Paginated Product List */}
      <Pagination products={filteredProducts} pageSize={pageSize} />
    </>
  );
};

export { ProductsLoader };
export default Products;
