import React, { Component } from 'react'
import { SHIP, HIT, MISS, SHOWSHIPS } from './Board'
import './Square.css'

class Square extends Component {
  render() {
    const { status } = this.props

    let className

    //sets css for grid, changes grid color according to value
    switch (status) {
      case MISS:
        className = 'miss'
        break
      case HIT:
        className = 'hit'
        break
      case SHIP:
        className = 'blank'
        break
      case SHOWSHIPS:
        className = 'ship'
        break
      default:
        className = 'blank'
    }

    return <td {...this.props} className={className} />
  }
}
export default Square
