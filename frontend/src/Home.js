// Connect4 Home Page

// Ability to generate game link with following options:
// - players: 2 - 4
// - timer: 10 sec or 30 sec

// settings button with the following settings:
// - dark mode toggle
// - color blind mode toggle

import * as React from "react";
import {addRedux} from "./redux/reducer";
import axios from 'axios';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    // Joins a game and opens a websocket for future updates
    handleClick(e) {
        e.preventDefault();
        axios.post('http://localhost:8080/join',
            {"game_id": this.props.gameID, "players": this.props.players}).then(_ => {
                let sock = new WebSocket("ws://localhost:8080/subscribe");
                sock.onopen = () => { sock.send(JSON.stringify({ "game_id": this.props.gameID })); }

                sock.onmessage = (msg) => {
                    let json = JSON.parse(msg.data)
                    if (this.props.stateID !== json.state_id) {
                        this.props.setStateID(json.state_id);
                        this.props.setBoard(json.board);
                        this.props.setTurn(json.turn);
                        this.props.setWinner(json.winner);
                    }
                }

                sock.onclose = () => {}
            });
        this.props.setPage("GAME");
        window.history.pushState(null, '', '/' + this.props.gameID);
    }

    render() {
        return (
            <div>
                <h1>CONNECT4</h1>
                <p>
                    Play 2-4 player connect4 against friends on one or more devices.
                    To create a game or join an existing game, enter a game ID and click 'GO'.
                </p>
                <form onSubmit={this.handleClick}>
                    <input autoFocus type="text" value={this.props.gameID}
                           onChange={(e) => this.props.setGameID(e.target.value)}/>
                    <button disabled={this.props.gameID.length < 4} onClick={this.handleClick}>Go</button>
                </form>
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
                        <input type="checkbox" onChange={(e) => {
                            e.stopPropagation();
                            this.props.setTimer(!this.props.timer);}
                        }/>
                        <span className="slider round"/>
                    </label>
                </div>
                <div>
                    SETTINGS ICON HERE
                </div>
            </div>
        )
    }
}
export default addRedux(HomePage);