import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const choices = ["Rock", "Paper", "Scissors"];

const getRoundWinner = (player1Choice, player2Choice, player1Name, player2Name) => {
    if (player1Choice === player2Choice) return 'Tie';
    if (
        (player1Choice === "Rock" && player2Choice === "Scissors") ||
        (player1Choice === "Scissors" && player2Choice === "Paper") ||
        (player1Choice === "Paper" && player2Choice === "Rock")
    ) {
        return player1Name; 
    } else {
        return player2Name;
    }
};

const GamePage = ({ player1Name, player2Name }) => {
    const [round, setRound] = useState(1);
    const [player1Choice, setPlayer1Choice] = useState("");
    const [player2Choice, setPlayer2Choice] = useState("");
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);
    const [result, setResult] = useState("");
    const [gameFinished, setGameFinished] = useState(false);
    const [finalWinner, setFinalWinner] = useState("");
    const [roundResults, setRoundResults] = useState([]);
    const [roundOver, setRoundOver] = useState(false);

    const getPlayer2Choice = () => {
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    };

    const handleChoice = (choice) => {
        if (!gameFinished && !roundOver) {
            const player2Choice = getPlayer2Choice();
            setPlayer1Choice(choice);
            setPlayer2Choice(player2Choice);

            const roundWinner = getRoundWinner(choice, player2Choice, player1Name, player2Name);
            setResult(roundWinner);

            if (roundWinner === player1Name) {
                setPlayer1Score(player1Score + 1);
            } else if (roundWinner === player2Name) {
                setPlayer2Score(player2Score + 1);
            }

            const updatedRoundResults = [...roundResults, { round, player1Choice: choice, player2Choice, roundWinner }];
            setRoundResults(updatedRoundResults);

            setRoundOver(true);
        }
    };

    const nextRound = () => {
        if (round === 6) {
            const finalResult = determineFinalWinner(player1Score, player2Score);
            setFinalWinner(finalResult);
            setGameFinished(true);
            saveGameToLocalStorage(roundResults, finalResult);
        } else {
            setRound(round + 1);
            setPlayer1Choice("");
            setPlayer2Choice("");
            setResult("");
            setRoundOver(false);  
        }
    };

    const determineFinalWinner = (finalPlayer1Score, finalPlayer2Score) => {
        if (finalPlayer1Score > finalPlayer2Score) {
            return `${player1Name}`;
        } else if (finalPlayer2Score > finalPlayer1Score) {
            return `${player2Name}`;
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
        setRoundOver(false);  
    };

    const saveGameToLocalStorage = (roundResults, finalWinner) => {
        const storedGames = JSON.parse(localStorage.getItem('gameHistory')) || [];
        const newGame = {
            player1Name,
            player2Name,
            roundResults,
            finalWinner,
        };
        storedGames.push(newGame);
        localStorage.setItem('gameHistory', JSON.stringify(storedGames));
    };

    return (
        <div>
            <header className='game-head'>
                <nav>
                    <ul>
                        <li><Link to="/">Change Players</Link></li>
                        <li><Link to="/results">View Results</Link></li>
                    </ul>
                </nav>
            </header>
            <main> 
                <section className='playername'>
                    <h1><span>{player1Name}</span> vs <span>{player2Name}</span></h1>
                    <h2> Round {round}</h2>
                    <div className="scoreboard">
                        <h3>{player1Name} Score: {player1Score}</h3>
                        <h3>{player2Name} Score: {player2Score}</h3>
                    </div>
                </section> 
                <section >
                    <div className='choices'>
                        <div className='choices-player'>
                            <h2>{player1Name}</h2>
                            {choices.map((choice) => (
                            <button key={choice} onClick={() => handleChoice(choice)} disabled={roundOver || gameFinished}>
                                {choice}
                            </button>
                            ))}
                        </div>

                        <div className='choices-player'>
                            <h2>{player2Name}</h2>
                            {player2Choice && <p>{player2Choice}</p>}
                        </div>
                    </div>
                    <div className='next-round-btn'>
                    <button onClick={nextRound} disabled={!roundOver || gameFinished}>
                        Next Round
                    </button>
                    </div>
                </section>
            </main>

            <footer>
                {result && <h2 className='round-winner'>Round Result: {result}</h2>}
                {gameFinished && finalWinner && <h2 className='final-winner'> Final Winner is : {finalWinner}</h2>}
                {gameFinished && (
                    <div className="reset-btn">
                    <button onClick={resetGame}>
                        Reset Game
                    </button>
                    </div>
                )}
            </footer>
        </div>
    );
};

export default GamePage;
