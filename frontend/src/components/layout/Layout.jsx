import React from 'react';
import { useLocation } from 'react-router-dom';
import {Footer, Header} from "./index.js";

const Layout = ({ children }) => {
    const location = useLocation();
    const hideHeaderFooter = location.pathname.startsWith('/room/');

    return (
        <>
            {!hideHeaderFooter && <Header />}
            {children}
            {!hideHeaderFooter && <Footer />}
        </>
    );
};

export default Layout;