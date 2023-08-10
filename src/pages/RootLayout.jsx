import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/TopBottomBars/NavBar';
import Footer from '../components/TopBottomBars/Footer';
import SecondBar from '../components/TopBottomBars/SecondBar';

const RootLayout = () => {
    return ( 
        <>
        <NavBar/>
        <SecondBar/>
        <main>
            <Outlet />
        </main>
        <Footer/>
        </>
     );
}
 
export default RootLayout;