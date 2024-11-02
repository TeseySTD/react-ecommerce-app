import { useLoaderData, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FakeStoreProvider from "../api/fake-store-api";
import Product from "../types/product";
import ProductCard from "../components/products/ProductCard";
import { Row, Col, Form, Button } from "react-bootstrap";

// Loader to fetch products
const ProductsLoader = async () => {
    const products = await FakeStoreProvider.getProducts();
    return products;
};

const Products = () => {
    const products = useLoaderData() as Product[];

    // Use search params for managing URL query parameters
    const [searchParams, setSearchParams] = useSearchParams();

    // Initialize filter states from URL parameters
    const initialFilterTitle = searchParams.get("title") || "";
    const initialFilterPrice = searchParams.get("price") || "";

    // Initialize state, only set from URL once on load
    const [filterTitle, setFilterTitle] = useState(initialFilterTitle);
    const [filterPrice, setFilterPrice] = useState(initialFilterPrice);

    // State for handling the timer
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    // Apply filtering based on query parameters
    const filteredProducts = products.filter((product: Product) => {
        return (
            (!filterTitle || product.title.toLowerCase().includes(filterTitle.toLowerCase())) &&
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
        setFilterTitle(newValue);

        // Clear the existing timer and set a new one
        if (timer) clearTimeout(timer);
        setTimer(setTimeout(() => {
            handleFilterUpdate(newValue, filterPrice); // Use the latest title and current price
        }, 750)); // delay
    };

    // Handle input change for price
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setFilterPrice(newValue);

        // Clear the existing timer and set a new one
        if (timer) clearTimeout(timer);
        setTimer(setTimeout(() => {
            handleFilterUpdate(filterTitle, newValue); // Use the latest price and current title
        }, 750)); //  delay
    };

    // Sync filter inputs with query parameters from the URL on page load
    useEffect(() => {
        setFilterTitle(searchParams.get("title") || "");
        setFilterPrice(searchParams.get("price") || "");
    }, [searchParams]);

    // Handle no products found or empty state
    if (products === undefined || products.length === 0)
        throw new Response("No products found", { status: 500, statusText: "No products found" });

    return (
        <>
            {/* Filter Form */}
            <Form className="mb-4">
                <Row>
                    <Col>
                        <Form.Group controlId="filterTitle">
                            <Form.Label>Filter by Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product title"
                                value={filterTitle}
                                onChange={handleTitleChange} // Directly use the handler
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="filterPrice">
                            <Form.Label>Filter by Price (max)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter max price"
                                value={filterPrice}
                                onChange={handlePriceChange} // Directly use the handler
                            />
                        </Form.Group>
                    </Col>
                    <Col className="d-flex align-items-end">
                        <Button
                            variant="secondary"
                            className="ms-2"
                            onClick={() => {
                                setFilterTitle("");
                                setFilterPrice("");
                                setSearchParams({}); // Reset the URL parameters
                            }}
                        >
                            Reset Filters
                        </Button>
                    </Col>
                </Row>
            </Form>

            {/* Product List */}
            <Row>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product: Product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p>No products match your filters.</p>
                )}
            </Row>
        </>
    );
};

export { ProductsLoader };
export default Products;
