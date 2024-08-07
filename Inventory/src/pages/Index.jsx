import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar.jsx';
import Dashboard from './Dashboard.jsx';
import Sidebar from '../components/Navbar/Sidebar.jsx';

function Index() {
    return (
        <>
            <div className='w-full h-full'>
                <Navbar/>
                <div className='flex w-full h-[calc(100%-56px)]'>
                    <div className='w-fit h-full shadow-sidebarshadow'>
                        <Sidebar/>
                    </div>
                    <div className='basis-11/12 md:basis-none md:w-full p-3'>
                        <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Routes>
                    </div>
                </div>

            </div>

        </>
    );
}

export default Index;