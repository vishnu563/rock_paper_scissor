import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlayerNamePage from './PlayerNamePage';
import Game from './Game.js';
import ResultsPage from './ResultsPage'; 
import './App.css'
const App = () => {
    const [player1Name, setPlayer1Name] = useState("");
    const [player2Name, setPlayer2Name] = useState("");

    return (
        <Router>
            <Routes>
                <Route path="/" element={<PlayerNamePage setPlayer1Name={setPlayer1Name} setPlayer2Name={setPlayer2Name} />} />
                <Route path="/game" element={<Game player1Name={player1Name} player2Name={player2Name} />} />
                <Route path="/results" element={<ResultsPage />} />
            </Routes>
        </Router>
    );
};

export default App;
