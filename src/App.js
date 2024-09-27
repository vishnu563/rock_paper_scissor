import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './Game';
import ResultsPage from './ResultsPage';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Game />} />
                    <Route path="/results" element={<ResultsPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
