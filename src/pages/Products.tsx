import { json, useLoaderData } from "react-router-dom";
import FakeStoreProvider from "../api/fake-store-api";
import Product from "../types/product";
import ProductCard from "../components/products/ProductCard";
import { Row } from "react-bootstrap";

const ProductsLoader = async () => {
    const products = await FakeStoreProvider.getProducts();
    return products;
}

const Products = () => {
    const products = useLoaderData() as Product[];
    if(products === undefined || products.length == 0)
        throw new Response("No products found", { status: 500, statusText: "No products found" });
    
    return (
        <Row>
            {products.map((product: Product) => (
                <ProductCard product={product} />
            ))}
        </Row>
    );
}
export { ProductsLoader };
export default Products;