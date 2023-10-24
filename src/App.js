import { useState } from "react";

function Square({ value, onSquareClick }) {
  // create button with click handler
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  // function takes index as param
  function handleClick(i) {
    // is the square is not null or there's a winning line, do nothing (aka return early)
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    // when the next square is clicked .slice makes new array (immutable)
    const nextSquares = squares.slice();
    // assign X and O to players
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    // sets Squares array to the new array when someone plays
    onPlay(nextSquares);
  }

  // define winner
  const winner = calculateWinner(squares);
  // declare status
  let status;
  // if there's a winner status
  if (winner) {
    status = "You're the Winner, " + winner + "!";
  } else {
    //if no winner status
    status = "Your turn, " + (xIsNext ? "X" : "O");
  }
  132;

  return (
    <>
      {/* create a place to store game status */}
      <div className="status">{status}</div>
      {/* space for the actual board */}
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// create space to hold game's history of turns
// is the default export so index.js will pull from here primarily
export default function Game() {
  //create array of  9 empty elements representing squares
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // create a variable for current move and default to 0
  const [currentMove, setCurrentMove] = useState(0);
  // x is assigned to even numbered turn (remainder is 0)
  const xIsNext = currentMove % 2 === 0;
  // assign current state to variable
  const currentSquares = history[currentMove];

  // function tracks history and dictates game rules
  function handlePlay(nextSquares) {
    // track history starting at the next move that is jumped to.
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // create variable to assign to moves iteration
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div classNames="game">
      <div className="game-board">
        {/* import board into function.
        Then pass handlePlay function to the board and anytime squares is called in board, the current turn aka currentSquares function is called */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  // create array of winning lines
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // for loop iterates through selected indexes as long as theres winning options to choose from
  for (let i = 0; i < lines.length; i++) {
    // not sure why we created this variable or how the if statement works
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
