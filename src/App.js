import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap'

import Board from './components/Board'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Guest',
      boardSize: 10,
      redirect: false,
      shots: 50,
    }
  }

  handleChange(e) {
    this.setState({ name: e.target.value })
  }

  getSize(e) {
    this.setState({ boardSize: e.target.value })
  }

  getShots(e) {
    this.setState({ shots: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({ redirect: true })
  }

  newUser(e) {
    e.preventDefault()
    this.setState({ redirect: false })
  }

  render() {
    const { redirect, name } = this.state
    //Button for username input and redirect once on board
    return (
      <Router>
        <div className="homePage">
          <Route
            exact
            path="/"
            render={props => (
              <div className="form">
                <div className="big-card">
                  <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                      <ControlLabel>Name</ControlLabel>
                      <FormControl type="text" value={this.state.name} onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                      <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Board Size</ControlLabel>
                        <FormControl
                          componentClass="select"
                          placeholder="select"
                          name="size"
                          onChange={this.getSize.bind(this)}
                        >
                          <option value="10">-Select Size-</option>
                          <option value="10">10</option>
                          <option value="15">15</option>
                          <option value="20">20</option>
                        </FormControl>
                      </FormGroup>
                    </div>
                    <div className="form-group">
                      <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Difficulty</ControlLabel>
                        <FormControl
                          componentClass="select"
                          placeholder="select"
                          name="difficulty"
                          onChange={this.getShots.bind(this)}
                        >
                          <option value="10">-Select Difficulty-</option>
                          <option value="75">Easy</option>
                          <option value="50">Normal</option>
                          <option value="25">Hard</option>
                        </FormControl>
                      </FormGroup>
                    </div>
                    <input type="submit" value="Start Game!" className="button" />
                  </form>
                  {redirect && <Redirect to="/board" />}
                </div>
              </div>
            )}
          />

          <Route
            exact
            path="/board"
            render={props => (
              <div id="center">
                <h1>{name}&rsquo;s Game</h1>
                <Board boardSize={this.state.boardSize} shots={this.state.shots} />
                <button className="button" onClick={this.newUser.bind(this)}>
                  <span>Home</span>
                </button>

                {!redirect && <Redirect to="/" />}
              </div>
            )}
          />
        </div>
      </Router>
    )
  }
}
export default App
