import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


/*class Square extends React.Component {
  constructor(props) {
    //add a constructor to the class to initialize the state
    super(props);
    //All React component classes that have a constructor should start it with a super(props) call.
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}*/

// function components are a simpler way to write components that only contain
// a render method and don’t have their own state.
// Instead of defining a class which extends React.Component,
// we can write a function that takes props as input and returns what should be rendered.
// Function components are less tedious to write than classes, and many components
// can be expressed this way.

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      //Add a constructor to the Board and set the Board’s initial state
      //to contain an array of 9 nulls corresponding to the 9 squares
      xIsNext: true,
      //boolean that will be flipped to determine which player goes next
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    //ignores a click if someone has won the game or if a Square is already filled
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    //the Square components are now controlled components. The Board has full control over them
    //.slice() creates a copy of the squares array to modify instead of modifying the existing array
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      //With this change, “X”s and “O”s can take turns
    });
  }

  renderSquare(i) {
    return (
      <Square
      //return <Square value={this.state.squares[i]} />;
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
        //pass a prop called value to the Square ('X', 'O', or null)
        //we’ll pass down a function from the Board to the Square, and we’ll have Square call that function when a square is clicked
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    //default X, displays which player has the next turn
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}


// this function will check for a winner and return 'X', 'O', or null as appropriate

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
