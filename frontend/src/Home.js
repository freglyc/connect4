// Connect4 Home Page

// Ability to generate game link with following options:
// - players: 2 - 4
// - timer: 10 sec or 30 sec

// settings button with the following settings:
// - dark mode toggle
// - color blind mode toggle

import * as React from "react";
import {addRedux, setBoard} from "./redux/reducer";
import axios from 'axios';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    // Joins a game and opens a websocket for future updates
    handleClick() {
        let data = { "game_id": this.props.gameID, "players": this.props.players }
        axios.post('http://localhost:8080/join', data).then((res) => {
            let sock = new WebSocket("ws://localhost:8080/subscribe");
            sock.onopen = () => {
                sock.send(JSON.stringify({ "game_id": this.props.gameID }));
            }

            sock.onmessage = (msg) => {
                let json = JSON.parse(msg.data)
                if (this.props.stateID !== json.state_id) {
                    this.props.setStateID(json.state_id);
                    this.props.setBoard(json.board);
                    this.props.setTurn(json.turn);
                    this.props.setWinner(json.winner);
                }
            }

            sock.onclose = () => {
                console.log("SOCKET CLOSED")
            }
        })
    }

    render() {
        return (
            <div>
                <h1>CONNECT4</h1>
                <p>
                    Play 2-4 player connect4 against friends on one or more devices.
                    To create a game or join an existing game, enter a game ID and click 'GO'.
                </p>
                <input autoFocus type="text" value={this.props.gameID}
                       onChange={(e) => this.props.setGameIDe(e.target.value)}/>
                <button onClick={this.handleClick}>Go</button>
                <div>
                    <label htmlFor="players">Players</label>
                    <select name="players" id="players"
                            onChange={(e) => this.props.setPlayers(parseInt(e.target.value))}>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <div>
                    Timer
                    <label className="switch">
                        <input type="checkbox" onChange={this.props.setTimer(!this.props.timer)}/>
                        <span className="slider round"/>
                    </label>
                </div>
            </div>
        )
    }
}

export default addRedux(HomePage);