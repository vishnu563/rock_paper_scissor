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
        <div className='resultpage'>
            <header className='result-head'>
            <nav>
                <ul>
                    <li><Link to="/game">Play Game</Link></li>
                </ul>
            </nav>
            <h1>Game Results</h1>
            </header>
            <main>
                {gameHistory.length === 0 ? (
                    <p>No games played yet.</p>
                ) : (
                    <>
                        <table className='data-table'>
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
                                         <tr>
                                            <td colSpan="5" className="players-name-row">
                                                <strong>Players: {game.player1Name} vs {game.player2Name}</strong>
                                            </td>
                                        </tr>
                                            <td rowSpan={7} className='table-value'>{gameIndex + 1}</td>
                                        {game.roundResults.map((round, roundIndex) => (<>
                                            <tr key={`${gameIndex}-${roundIndex}`}>
                                                <td className='table-value'>{round.round}</td>
                                                <td className='table-value'>{round.player1Choice}</td>
                                                <td className='table-value'>{round.player2Choice}</td>
                                                <td className='table-value'>{round.roundWinner}</td>
                                            </tr>
                                        </>
                                        ))}
                                        <tr key={`final-${gameIndex}`}>
                                            <td colSpan="5" className='winner-table'>
                                                <strong>Final Winner For Game {gameIndex + 1}: {game.finalWinner}</strong>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                        
                        <button onClick={clearResults}>
                            Clear Results
                        </button>
                    </>
                )}
            </main>
        </div>
    );
};

export default ResultsPage;
