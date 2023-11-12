import React,{useEffect, useState} from 'react';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import SellerRegister from './Seller/form/sellerRegistration';
import SellerLayout from './Seller/component/main/sellerLayout';
import SellerLogin from './Seller/form/sellerLogin';
import Dashboard from './Seller/pages/Dashboard';
import MyProducts from './Seller/pages/myProducts';
import Categories from './pages/Categories';
import Products from './pages/Products';
import SingleProducts from './pages/SIngleProduct';
import CheckoutPage from './pages/CheckoutPage';
import Live from './pages/Live';
import { toast, ToastContainer } from 'react-toastify';
import About from './pages/About';
import { Provider, useDispatch } from 'react-redux';
import {store,persistor} from './redux/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { io } from 'socket.io-client';
import jwtDecode from 'jwt-decode';
import { CART } from './redux/Constants';
import Cart from './pages/Cart';
import Delivery from './Seller/pages/Delivery';
import axios from 'axios';
import PersonalizedProduct from './pages/PersonalizedProducts';
const socket = io('http://localhost:4000/abc');


function App() {

  const router= createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      children:[
      {
        path:'/',
        element:<Homepage/>,
      },
      {
        path:'/login',
        element:<Login/>,
      },
      {
        path:'/register',
        element:<Register/>
      },
      {
        path:'/categories',
        element:<Categories/>
      },
      {
        path:'/about',
        element:<About/>
      },
      {
        path:'/categories/:id',
        element:<Products/>
      },
      {
        path:'/live-products',
        element:<Live/>
      },
      {
        path:'/product/:id',
        element:<SingleProducts />
      },
      {
        path:'/seller/store/:id',
        element:<PersonalizedProduct />
      },
      {
        path:'/checkout',
        element: <CheckoutPage/>
      },
      {
        path:'/cart',
        element: <Cart/>
      },
      ]
    },

    {
      path:'/seller',
      element:<SellerLayout/>,
      children:[
        {
          path:'/seller/sign-in',
          element:<SellerLogin/>
        },
        {
          path:'/seller/register',
          element:<SellerRegister/>
        },
        {
          path:'/seller/pages/dashboard',
          element:<Dashboard/>
        },
        {
          path:'/seller/pages/MyProducts',
          element:<MyProducts/>
        },
        {
          path:'/seller/pages/delivery',
          element:<Delivery/>
        },
      ]
    }
  ])
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
    <div>
        <RouterProvider router={router} />
        <ToastContainer/>
    </div>
    </PersistGate>
    </Provider>
  );
}

export default App;
