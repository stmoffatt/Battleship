import React, { Component } from 'react'

import Square from './Square'
import './Board.css'

//CONASTANT VALUES FOR GRID VALUES
export const EMPTY = 0
export const SHIP = 1
export const HIT = 2
export const MISS = 3
export const SHOWSHIPS = 4

class Board extends Component {
  constructor(props) {
    super(props)

    const { boardSize, shots } = this.props

    //Maintain state for the entire game in your main component
    this.state = {
      board: this.getBoard(boardSize),
      shots: shots,
      msg: '',
    }
  }

  //loop create another for loop to create the <td> tags
  tdRow(row) {
    const { board } = this.state
    let tdSquare = []

    for (let col = 0; col < this.props.boardSize; col++) {
      tdSquare.push(
        <Square key={`${row}_${col}`} status={board[row][col]} onClick={this.handleClick.bind(this, row, col)} />,
      )
    }

    return tdSquare
  }

  //Use a for loop to add a new row to table
  newRow() {
    let newBoard = []

    for (let iter = 0; iter < this.props.boardSize; iter++) {
      newBoard.push(<tr key={iter}>{this.tdRow(iter)}</tr>)
    }
    return newBoard
  }

  //creates a board with however many squares we pass to the function
  getBoard(boardSize) {
    let board = []
    let shipList = [2, 3, 3, 4, 5]
    //Create an array of arrays for an empty board
    for (let row = 0; row < boardSize; row++) {
      board[row] = []
      for (let col = 0; col < boardSize; col++) {
        board[row][col] = EMPTY
      }
    }
    //places five ships on the board
    for (let ship = 0; ship < 5; ship++) {
      board = this.putShip(board, shipList[ship])
    }
    return board
  }

  //gets a random coordinate on the grid
  getPos() {
    var x = Math.floor(Math.random() * this.props.boardSize) // random number between 0 - 9
    var y = Math.floor(Math.random() * this.props.boardSize)
    return [x, y]
  }
  // places ship horizontally
  // restarts puShip() if it will overlap any existing ships,

  putHoriz(newBoard, shipSize) {
    let findPlace = true
    //ship is always placed in bounds of the board
    while (findPlace) {
      //While true, will get random position
      var pos = this.getPos()
      var x = pos[0]
      var y = pos[1]
      let placeShip = 0

      //keeps ships placed within board
      if (x + shipSize > this.props.boardSize) {
        x -= shipSize
      }
      // Checks if the ship will overlap an existing ship
      for (let iter = 0; iter < shipSize; iter++) {
        // Adds 1 to placeShip is space is valid
        if (newBoard[x + iter][y] === EMPTY) {
          placeShip++
        }
      }
      // Will only place a ship when valid number of spaces is equal to the length of the ship being placed.
      if (placeShip === shipSize) {
        for (let iter = 0; iter < shipSize; iter++) {
          newBoard[x + iter][y] = SHIP
        }
        findPlace = false
        return newBoard
      }
    }
  }

  // places ship vertically
  // Same idea of horizontal, but iterates through y instead of x

  putVertical(newBoard, shipSize) {
    let findPlace = true
    //ship is always placed in bounds of the board
    // console.log("VERT  ATTEMPT          2 ");
    while (findPlace) {
      var pos = this.getPos()
      var x = pos[0]
      var y = pos[1]
      let placeShip = 0

      if (y + shipSize > this.props.boardSize) {
        y -= shipSize
      }

      for (let iter = 0; iter < shipSize; iter++) {
        if (newBoard[x][y + iter] === EMPTY) {
          placeShip++
        }
      }

      if (placeShip === shipSize) {
        for (let iter = 0; iter < shipSize; iter++) {
          newBoard[x][y + iter] = SHIP
        }
        findPlace = false
        return newBoard
      }
    }
  }

  // places a ship on a random valid coordinate
  // chooses between horizontal or vertical placement randomly
  putShip(board, shipSize) {
    var ranNum = Math.floor(Math.random() * 2) // 1 for horizontal

    if (ranNum === 1) {
      board = this.putHoriz(board, shipSize)
    } else {
      board = this.putVertical(board, shipSize)
    }
    return board
  }

  //Triggers on click then:
  //checks corresponding board value if there is a ships
  //lets user know if its a hit or miss
  //then removes a shot from the shot counter
  handleClick(row, col) {
    let { board, shots, msg } = this.state

    if (board[row][col] === EMPTY) {
      board[row][col] = MISS
      shots--
      msg = this.checkWin(board, MISS)
    } else if (board[row][col] === SHIP) {
      board[row][col] = HIT
      shots--
      msg = this.checkWin(board, HIT)
    }

    if (shots < 1) {
      msg = 'YOU LOSE'
      shots = 0
      board = this.renderGameOver(board)
    }

    this.setState({
      board: board,
      shots: shots,
      msg: msg,
    })
  }

  //checks if the user has hit all ships
  checkWin(newBoard, hitOrMiss) {
    var totalHit = 0
    if (hitOrMiss === HIT) {
      for (let row = 0; row < this.props.boardSize; row++) {
        for (let col = 0; col < this.props.boardSize; col++) {
          if (newBoard[row][col] === HIT) {
            totalHit++
          }
        }
      }
      // Check if all ships have been hit, ends game on win
      if (totalHit === 17) {
        if (!alert('YOU WIN')) {
          window.location.reload()
        }
        return 'YOU SUNK MY BATTLESHIP!'
      } else {
        return 'Hit! '
      }
    } else {
      return 'You missed!'
    }
  }

  // On game over replaces all SHIP values with SHOWSHIPS to reveal location
  renderGameOver(board) {
    const { boardSize } = this.props

    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        if (board[row][col] === SHIP) {
          board[row][col] = SHOWSHIPS
        }
      }
    }
    return board
  }

  newGame(e) {
    let { boardSize, shots } = this.props

    this.setState({
      board: this.getBoard(boardSize),
      shots: shots,
      msg: 'Take the shot!',
    })
  }

  render() {
    return (
      <div>
        <div className="main">
          <div className="table">
            <table>
              <tbody>{this.newRow()}</tbody>
            </table>
          </div>
        </div>
        <h1 className="msg">{this.state.msg}</h1>
        <span className="shotCount">&nbsp;{this.state.shots}</span>&nbsp;shots left
        <br />
        <button onClick={this.newGame.bind(this)} className="button">
          New game!
        </button>
      </div>
    )
  }
}

export default Board
