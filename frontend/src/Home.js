// Connect4 Home Page

// Ability to generate game link with following options:
// - players: 2 - 4
// - timer: 10 sec or 30 sec

// settings button with the following settings:
// - dark mode toggle
// - color blind mode toggle

import * as React from "react";
import {addRedux} from "./redux/reducer";
import {WebSocketContext} from "./WebSocket";
import {useContext} from "react";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    // Joins a game and opens a websocket for future updates
    handleClick() {
        let sock = new WebSocket("ws://localhost:8080/create");
        sock.onopen = () => {
            sock.send(JSON.stringify({"game_id": this.props.gameID, "players": 2}));
        }

        sock.onmessage = (msg) => {
            console.log(msg.data);
        }
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
                <label htmlFor="players">Players:</label>
                <select name="players" id="players"
                        onChange={(e) => this.props.setPlayers(e.target.value)}>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>
        )
    }
}

export default addRedux(HomePage);