import React from 'react';
import './App.css';
import AppHeader from './components/layout/AppHeader';
import AppFooter from './components/layout/AppFooter';
import { BrowserRouter, Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import NotFound from './components/layout/NotFound';
import Home, { HomeLoader } from './pages/Home';
import ServerError from './components/layout/ServerError';
import Layout from './components/layout/Layout';
import Product from './types/product';
import Products, { ProductsLoader } from './pages/Products';
import ProductDetails, { ProductDetailsLoader } from './components/products/ProductDetails';


const RoutesJsx =(
  <Route path="/" errorElement={<ServerError />} element={<Layout />}>
    <Route index element={<Home />} loader={HomeLoader} />
    <Route path="products" element={<Products/>} loader={ProductsLoader} />
    <Route path="products/:productId" element={<ProductDetails />} loader={ProductDetailsLoader} />
    <Route path="cart" element={<h1>Cart</h1>} />
    <Route path="favorites" element={<h1>Favorites</h1>} />
    <Route path="*" element={<NotFound />} />
</Route>
);

const routes = createRoutesFromElements(RoutesJsx);

const router = createBrowserRouter(routes);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
