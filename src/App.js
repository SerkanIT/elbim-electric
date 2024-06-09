import React from 'react';
import Navbar from "./components/MainPage/Navbar";
import './style.scss'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import Footer from "./components/MainPage/Footer";
import Product from "./components/Products/Product";
import Order from "./components/order/Order";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import NotFound from "./components/404/NotFound";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import {HelmetProvider} from "react-helmet-async";

const App = () => {

    return (
        <HelmetProvider>
        <BrowserRouter>
        <div className="container">
           <Navbar/>
            <div className="sections">
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/products" element={<Product/>}/>
                <Route path="/order" element={<Order/>}/>
                <Route path="/product-detail/:id" element={<ProductDetail/>}/>
                <Route path="/contacts" element={<Contact/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            </div>
        </div>
            <Footer/>

        </BrowserRouter>
        </HelmetProvider>
    );
};

export default App;