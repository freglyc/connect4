// Connect4 Game Page

import * as React from "react";
import {addRedux} from "./redux/reducer";
import axios from 'axios';

class GamePage extends React.Component {
    constructor(props) { super(props); }

    /**
     * POST place - send a place token request
     * @param column - the column to place the token
     */
    place(column) { axios.post('http://localhost:8080/place', {"game_id": this.props.gameID, "column": column}).then(_ => {}) }

    /**
     * POST next = send a next turn request
     */
    next() { axios.post('http://localhost:8080/next', {"game_id": this.props.gameID}).then(_ => {}) }

    /**
     * POST reset - send a reset request
     */
    reset() { axios.post('http://localhost:8080/reset', {"game_id": this.props.gameID}).then(_ => {}) }

    render() {
        return (
            <div>
                <a href={'http://' + window.location.host}>CONNECT4</a>
                <div className="board">
                    {this.props.board}
                </div>
                <div>
                    {this.props.turn}
                </div>
            </div>
        )
    }
}
export default addRedux(GamePage);