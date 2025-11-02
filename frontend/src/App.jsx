import './assets/styles/App.css'

import React from "react";
import {BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter.jsx";
import {Layout} from "./components/layout/index.js";
import {AuthProvider} from "./context/AuthProvider.jsx";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Layout>
                    <AppRouter />
                </Layout>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App