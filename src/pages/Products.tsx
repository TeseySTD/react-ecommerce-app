import { useLoaderData, useSearchParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import FakeStoreProvider from '../api/fake-store-api';
import Product from '../types/product';
import Pagination from '../components/products/Pagination';
import { Form, Button } from 'react-bootstrap';
import Category from '../types/category';

const _inputDelay = 200; // ms

// Loader to fetch products and categories
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

  const [searchParams, setSearchParams] = useSearchParams();
  const [pageSize] = useState(10);

  // Initialize filter states
  const initialFilterTitle = searchParams.get('title') || '';
  const initialFilterPrice = searchParams.get('price') || '';
  const initialFilterCategory = searchParams.get('category') || '';

  const [filterTitle, setFilterTitle] = useState(initialFilterTitle);
  const [filterPrice, setFilterPrice] = useState(initialFilterPrice);
  const [filterCategory, setFilterCategory] = useState(initialFilterCategory);

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const filterFormRef = useRef<HTMLFormElement>(null);

  // Filtered products based on filters
  const filteredProducts = products.filter((product: Product) => {
    return (
      (!filterTitle ||
        product.title.toLowerCase().includes(filterTitle.toLowerCase())) &&
      (!filterPrice || product.price <= parseFloat(filterPrice)) &&
      (!filterCategory || product.category.id === parseInt(filterCategory))
    );
  });

  const handleFilterUpdate = (
    title: string,
    price: string,
    category: string
  ) => {
    const params: any = {};
    if (title) params.title = title;
    if (price) params.price = price;
    if (category) params.category = category;
    setSearchParams(params);
  };

  const debounceFilterChange = (callback: () => void, delay: number) => {
    if (timer) clearTimeout(timer);
    setTimer(setTimeout(callback, delay));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    debounceFilterChange(() => {
      setFilterTitle(newValue);
      handleFilterUpdate(newValue, filterPrice, filterCategory);
    }, _inputDelay);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    debounceFilterChange(() => {
      handleFilterUpdate(filterTitle, newValue, filterCategory);
      setFilterPrice(newValue);
    }, _inputDelay);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    handleFilterUpdate(filterTitle, filterPrice, newValue);
    setFilterCategory(newValue);
  };

  useEffect(() => {
    setFilterTitle(searchParams.get('title') || '');
    setFilterPrice(searchParams.get('price') || '');
    setFilterCategory(searchParams.get('category') || '');
  }, [searchParams]);

  if (products === undefined || products.length === 0)
    throw new Response('No products found', {
      statusText: 'No products found',
      status: 500
    });

  return (
    <>
      {/* Filter Form */}
      <Form className="my-4 d-flex justify-content-center" ref={filterFormRef}>
        <div className="d-flex flex-row align-items-center justify-content-center w-75">
          <div className="d-flex flex-column mx-4">
            <Form.Group
              controlId="filterCategory"
              className="d-flex flex-row align-items-center"
            >
              <Form.Label className="text-nowrap mb-0 me-4">
                Filter by Category
              </Form.Label>
              <Form.Select
                onChange={handleCategoryChange}
              >
                <option value="">All Categories</option>
                {categories.map((category: Category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
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
                onChange={handleTitleChange}
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
                onChange={handlePriceChange}
              />
            </Form.Group>
          </div>
          <div className="d-flex flex-column mx-4">
            <Button
              variant="secondary"
              onClick={() => {
                setFilterTitle('');
                setFilterPrice('');
                setFilterCategory('');
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
