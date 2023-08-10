import React from 'react';
import NavBar from '../layout/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../../../components/TopBottomBars/Footer';


const SellerLayout = () => {
    return ( 
        <>
            <NavBar/>
            <Outlet/>
            <Footer/>
           
        </>
     );
}
 
export default SellerLayout;