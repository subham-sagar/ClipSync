import React from 'react';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PublicDashboard from "./pages/PublicDashboard";



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<Auth signin={true} />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<Auth signup={true} />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/public-dashboard/:userId" element={<PublicDashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;