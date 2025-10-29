import './assets/styles/App.css'

import React from "react";
import {BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter.jsx";
import {Layout} from "./components/layout/index.js";

function App() {
    console.log(import.meta.env.VITE_API_URL)
    return (
        <BrowserRouter>
            <Layout>
                <AppRouter />
            </Layout>
        </BrowserRouter>
    )
}

export default App