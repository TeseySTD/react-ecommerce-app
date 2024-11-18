import React from 'react';
import './App.css';
import AppHeader from './components/layout/AppHeader';
import AppFooter from './components/layout/AppFooter';
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  createHashRouter
} from 'react-router-dom';
import NotFound from './components/layout/NotFound';
import Home, { HomeLoader } from './pages/Home';
import ServerError from './components/layout/ServerError';
import Layout from './components/layout/Layout';
import Product from './types/product';
import Products, { ProductsLoader } from './pages/Products';
import ProductDetails, {
  ProductDetailsLoader
} from './components/products/ProductDetails';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import { basename } from 'path';

const RoutesJsx = (
  <Route path="/"  element={<Layout />}>
    {/* Add error page wrapper for layout */}
    <Route path='/' errorElement={<ServerError />}>
      <Route index element={<Home />} loader={HomeLoader} />
      <Route path="/products" element={<Products />} loader={ProductsLoader} />
      <Route
        path="/products/:productId"
        element={<ProductDetails />}
        loader={ProductDetailsLoader}
      />
      <Route path="/cart" element={<Cart />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/*" element={<NotFound />} />
    </Route>
  </Route>
);

const routes = createRoutesFromElements(RoutesJsx);

const router = createHashRouter(routes, { basename: '/' });

function App() {
  return <RouterProvider router={router} />;
}

export default App;
