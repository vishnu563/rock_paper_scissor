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
            navigate('/game'); 
        }
    };

    return (
        <div className='inputs'>
            <h1>Enter Player'S Name</h1>
            <form >
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
            </form>
        </div>
    );
};

export default PlayerNamePage;
