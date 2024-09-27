import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlayerNamePage = ({ setPlayer1Name, setPlayer2Name }) => {
    const [localPlayer1Name, setLocalPlayer1Name] = useState("");
    const [localPlayer2Name, setLocalPlayer2Name] = useState("");
    const navigate = useNavigate();

    const startGame = () => {
        if (localPlayer1Name && localPlayer2Name) {
            setPlayer1Name(localPlayer1Name);
            setPlayer2Name(localPlayer2Name);
            navigate('/game'); // Navigate to the game page
        }
    };

    return (
        <div>
            <h1>Enter Player Names</h1>
            <input
                type="text"
                placeholder="Player 1 Name"
                value={localPlayer1Name}
                onChange={(e) => setLocalPlayer1Name(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Player 2 Name"
                value={localPlayer2Name}
                onChange={(e) => setLocalPlayer2Name(e.target.value)}
                required
            />
            <button onClick={startGame}>Start Game</button>
        </div>
    );
};

export default PlayerNamePage;
