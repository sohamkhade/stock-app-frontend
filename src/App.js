import React, {useEffect, useState} from 'react';
import SearchPage from './pages/SearchPage';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import PortfolioPage from './pages/PortfolioPage';
import WatchListPage from './pages/WatchListPage';
import NavBar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

const useClearLocalStorageOnReload = () => {
    useEffect(() => {
        window.localStorage.clear();
    }, []);
};
const App = () => {
    const [name, setName] = useState("");
    useClearLocalStorageOnReload();
    return (
        <div className={'vh-100'}>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Navigate to="/search/home" />} />
                    <Route path="/search/home" element={<SearchPage />} />
                    <Route path="/search/:name" element={<SearchPage />} />
                    <Route path="/portfolio" element={<PortfolioPage />} />
                    <Route path="/watchlist" element={<WatchListPage />} />
                    {/* Add more routes as needed */}
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default App;
