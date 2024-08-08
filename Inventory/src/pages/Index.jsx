import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar.jsx';
import Dashboard from './Dashboard.jsx';
import Sidebar from '../components/Navbar/Sidebar.jsx';
import Product from './Product.jsx';
import Purchase from './Purchase.jsx';
import Order from './Order.jsx';

function Index({setPopUps}) {
    return (
        <>
            <div className='w-full h-full'>
                <Navbar/>
                <div className='flex w-full h-[calc(100%-56px)] overflow-hideen'>
                    <div className='w-fit h-full shadow-sidebarshadow'>
                        <Sidebar/>
                    </div>
                    <div className='basis-11/12 md:basis-none md:w-full overflow-y-scroll'>
                        <div className='p-3'>
                            <Routes>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/product" element={<Product setPopUps={setPopUps}/>} />
                                <Route path="/purchase" element={<Purchase setPopUps={setPopUps}/>} />
                                <Route path="/orders" element={<Order setPopUps={setPopUps}/>} />
                            </Routes>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}

export default Index;