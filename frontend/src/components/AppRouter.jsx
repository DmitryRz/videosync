import React from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "../pages/home/HomePage.jsx";
import SignInPage from "../pages/auth/SignInPage.jsx";
import SignUpPage from "../pages/auth/SignUpPage.jsx";
import VideosPage from "../pages/video/VideosPage.jsx";
import AdminPanelPage from "../pages/admin/AdminPanelPage.jsx";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/admin" element={<AdminPanelPage />} />
            <Route path="*" element={<HomePage/>} />
        </Routes>
    );
};

export default AppRouter;
