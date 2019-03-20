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
      //Add a constructor to the Board and set the Board’s initial state to contain an array of 9 nulls corresponding to the 9 squares
      xIsNext: true,
      //boolean that will be flipped to determine which player goes next 
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
    //the Square components are now controlled components. The Board has full control over them
    //.slice() creates a copy of the squares array to modify instead of modifying the existing array
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
    const status = 'Next player: X';

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
