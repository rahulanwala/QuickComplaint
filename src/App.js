import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterScreen from './RegisterScreen';
import MainScreen from './MainScreen';
import SuccessScreen from './SuccessScreen';  // Import SuccessScreen

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RegisterScreen />} />
                <Route path="/main" element={<MainScreen />} />
                <Route path="/success" element={<SuccessScreen />} />  
            </Routes>
        </Router>
    );
}

export default App;
