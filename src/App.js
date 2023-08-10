import React,{useEffect} from 'react';
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
import { ToastContainer } from 'react-toastify';
import About from './pages/About';
import { Provider } from 'react-redux';
import {store,persistor} from './redux/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import io from 'socket.io-client';

function App() {
  useEffect(() => {
    // Replace with your server URL
    const socket = io('http://localhost:4000');
   socket.on('connect', () => {
     console.log('Socket connected');
   });

   socket.on('disconnect', () => {
     console.log('Socket disconnected');
   });

   socket.on('sendNotification', (data) => {
     // Update the notifications state with the received notification
     // setNotifications((prevNotifications) => [
     //   ...prevNotifications,
     //   { id: prevNotifications.length + 1, message: data.about },
     // ]);
     console.log("DD",data)
   });

   return () => {
     socket.disconnect(); // Clean up the socket connection when the component unmounts
   };
 }, []);
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
        path:'/checkout',
        element: <CheckoutPage/>
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
