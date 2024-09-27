import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const choices = ["Rock", "Paper", "Scissors"];

const getRoundWinner = (player1Choice, player2Choice, player1Name, player2Name) => {
    if (player1Choice === player2Choice) return 'Tie';
    if (
        (player1Choice === "Rock" && player2Choice === "Scissors") ||
        (player1Choice === "Scissors" && player2Choice === "Paper") ||
        (player1Choice === "Paper" && player2Choice === "Rock")
    ){
        return player1Name; 
    } 
    else {
        return player2Name; 
    }
};

const Game = () => {
    const [round, setRound] = useState(1);
    const [player1Name, setPlayer1Name] = useState("");
    const [player2Name, setPlayer2Name] = useState("");
    const [player1Choice, setPlayer1Choice] = useState("");
    const [player2Choice, setPlayer2Choice] = useState(""); 
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0); 
    const [result, setResult] = useState("");
    const [gameFinished, setGameFinished] = useState(false);
    const [finalWinner, setFinalWinner] = useState("");
    const [roundResults, setRoundResults] = useState([]);
    const [gameStarted, setGameStarted] = useState(false); 

    const getPlayer2Choice = () => {
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    };

    const handleChoice = (choice) => {
        if (!gameFinished) {
            setPlayer1Choice(choice);
            const player2Choice = getPlayer2Choice();
            setPlayer2Choice(player2Choice);
        }
    };

    const nextRound = () => {
        const roundWinner = getRoundWinner(player1Choice, player2Choice, player1Name, player2Name);
        
        const updatedRoundResults = [...roundResults, { round, player1Choice, player2Choice, roundWinner }];
        
        if (roundWinner === player1Name) {
            setPlayer1Score(player1Score + 1);
        } else if (roundWinner === player2Name) {
            setPlayer2Score(player2Score + 1);
        }
        
        setResult(roundWinner);
        setRoundResults(updatedRoundResults);

        if (round === 6) {
            const finalResult = determineFinalWinner(player1Score + (roundWinner === player1Name ? 1 : 0), player2Score + (roundWinner === player2Name ? 1 : 0));
            setFinalWinner(finalResult);
            setGameFinished(true);
            saveGameToLocalStorage(updatedRoundResults, finalResult);
        } else {
            setRound(round + 1);
        }

        setPlayer1Choice("");
        setPlayer2Choice("");
    };

    const determineFinalWinner = (finalPlayer1Score, finalPlayer2Score) => {
        if (finalPlayer1Score > finalPlayer2Score) {
            return `${player1Name} is the overall winner!`;
        } else if (finalPlayer2Score > finalPlayer1Score) {
            return `${player2Name} is the overall winner!`;
        } else {
            return 'It\'s a tie!';
        }
    };

    const resetGame = () => {
        setRound(1);
        setPlayer1Score(0);
        setPlayer2Score(0);
        setPlayer1Choice("");
        setPlayer2Choice("");
        setResult("");
        setFinalWinner("");
        setRoundResults([]);
        setGameFinished(false);
    };

    const saveGameToLocalStorage = (roundResults, finalWinner) => {
        const storedGames = JSON.parse(localStorage.getItem('gameHistory')) || [];
        const newGame = {
            roundResults,
            finalWinner,
        };
        storedGames.push(newGame);
        localStorage.setItem('gameHistory', JSON.stringify(storedGames));
    };

    const startGame = () => {
        if (player1Name && player2Name) { 
            setGameStarted(true);
        }
    };

    return (
        <div>
            {!gameStarted ? (
                <div>
                    <h1>Enter Player Names</h1>
                    <input 
                        type="text" 
                        placeholder="Player 1 Name" 
                        value={player1Name}
                        onChange={(e) => setPlayer1Name(e.target.value)}
                        required
                    />
                    <input 
                        type="text" 
                        placeholder="Player 2 Name" 
                        value={player2Name}
                        onChange={(e) => setPlayer2Name(e.target.value)} 
                        required
                    />
                    <button onClick={startGame}>Start Game</button>
                </div>
            ) : (
                <>
                <nav>
                    <ul>
                        <li><Link to="/results">View Results</Link></li>
                    </ul>
                </nav>
                    <h1>{player1Name} vs {player2Name} - Round {round}</h1>
                    <div className="scoreboard">
                        <p>{player1Name} Score: {player1Score}</p>
                        <p>{player2Name} Score: {player2Score}</p>
                    </div>

                    <div className="choices">
                        <div>
                            <h2>{player1Name}</h2>
                            {choices.map((choice) => (
                                <button key={choice} onClick={() => handleChoice(choice)} disabled={gameFinished}>
                                    {choice}
                                </button>
                            ))}
                        </div>

                        <div>
                            <h2>{player2Name}</h2>
                            {player2Choice && <p>{player2Choice}</p>}
                        </div>
                    </div>

                    <button onClick={nextRound} disabled={!player1Choice || gameFinished}>
                        Next Round
                    </button>

                    {result && <h2>Round Result: {result}</h2>}
                    {gameFinished && finalWinner && <h2>{finalWinner}</h2>}
                    {gameFinished && (
                        <button onClick={resetGame} className="reset-btn">
                            Reset Game
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default Game;
