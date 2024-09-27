import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ResultsPage = () => {
    const [gameHistory, setGameHistory] = useState([]);

    useEffect(() => {
        const storedGames = JSON.parse(localStorage.getItem('gameHistory')) || [];
        setGameHistory(storedGames);
    }, []);

    const clearResults = () => {
        localStorage.removeItem('gameHistory');
        setGameHistory([]);
    };

    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Play Game</Link></li>
                </ul>
            </nav>

            <h1>Game Results</h1>

            {gameHistory.length === 0 ? (
                <p>No games played yet.</p>
            ) : (
                <>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Game No</th>
                                <th>Round No</th>
                                <th>Player 1 Choice</th>
                                <th>Player 2 Choice</th>
                                <th>Round Winner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gameHistory.map((game, gameIndex) => (
                                <React.Fragment key={gameIndex}>
                                    {game.roundResults.map((round, roundIndex) => (
                                        <tr key={`${gameIndex}-${roundIndex}`}>
                                            <td>{gameIndex + 1}</td>
                                            <td>{round.round}</td>
                                            <td>{round.player1Choice}</td>
                                            <td>{round.player2Choice}</td>
                                            <td>{round.roundWinner}</td>
                                        </tr>
                                    ))}
                                    <tr key={`final-${gameIndex}`}>
                                        <td colSpan="5">
                                            <strong>Final Winner: {game.finalWinner}</strong>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>

                    {/* Clear Results Button */}
                    <button onClick={clearResults} style={{ marginTop: '20px' }}>
                        Clear Results
                    </button>
                </>
            )}
        </div>
    );
};

export default ResultsPage;
