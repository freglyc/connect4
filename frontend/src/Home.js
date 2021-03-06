// Connect4 Home Page

import * as React from "react";
import {addRedux} from "./redux/reducer";
import axios from 'axios';
import {server} from "./Network";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    subscribe(data, counter) {
        axios.post('https://' + server + '/join', data).then(_ => {
            let sock = new WebSocket('wss://' + server + '/subscribe');
            sock.onopen = () => { sock.send(JSON.stringify({ "game_id": this.props.gameID })); }
            sock.onmessage = (msg) => {
                let json = JSON.parse(msg.data)
                if (this.props.stateID !== json.state_id) {
                    this.props.setStateID(json.state_id);
                    this.props.setBoard(json.board);
                    this.props.setTurn(json.turn);
                    this.props.setTeams(json.teams);
                    this.props.setWinner(json.winner);
                    this.props.setTimer(json.has_timer);
                    this.props.setCurrentTime(json.cur_time);
                    this.props.setTime(json.time);
                    this.props.setStarted(json.started);
                }
            }
            sock.onclose = () => {
                // Websocket connection dropped after too many refreshes
                if (counter < 5) {
                    if (sock.readyState === WebSocket.CLOSED) { this.subscribe(data, counter + 1); }
                } else {
                    this.props.setTimeout(true);
                }
            }
        })
    }

    // Joins a game and opens a websocket for future updates
    handleClick(e) {
        e.preventDefault();
        if (this.props.gameID.includes(" ") || this.props.gameID.length < 3) return
        let data = {"game_id": this.props.gameID, "players": this.props.players, "timer": this.props.timer};
        this.subscribe(data, 0);
        this.props.setJoinedGame(true);
        this.props.setPage("GAME");
        window.history.pushState(null, '', '/' + this.props.gameID);
    }

    render() {
        return (
            <div className="flexbox flex-column flex-center full-height">
                <div className="flexbox flex-column flex-center half-width">
                    <h1 className="title-txt large-padding-top"><a className="red remove-hyperlink" href={'http://' + window.location.host}>CONNECT<span className="blue">4</span></a></h1>
                    <p className="standard-txt lighter-txt gray large-padding-top">
                        Play two to three player Connect4 online against friends.
                        To create a game or join an existing one, enter a game ID and click 'Go'.
                    </p>
                    <form className="flexbox large-padding-top full-width" onSubmit={this.handleClick}>
                        <input className="input" autoFocus type="text" value={this.props.gameID}
                               onChange={(e) => this.props.setGameID(e.target.value)}/>
                        <button className="goBtn" onClick={this.handleClick}>Go</button>
                    </form>
                    <div className="flexbox flex-self-end small-padding-top">
                        <div className="flexbox flex-center small-padding-right">
                            <button className="fas fa-cog dark gear" onClick={(e) => {
                                e.preventDefault();
                                this.props.setPage("SETTINGS");
                            }}/>
                        </div>
                        <div className="flexbox flex-center medium-padding-right">
                            <label className="small-padding-right standard-txt boldest-txt blue" htmlFor="players">PLAYERS</label>
                            <select className="small-txt boldest-txt select" name="players" id="players"
                                    onChange={(e) => this.props.setPlayers(parseInt(e.target.value))}>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                        <div className="flexbox flex-center">
                            <label className="small-padding-right standard-txt boldest-txt blue">TIMER</label>
                            <label className="switch">
                                <input type="checkbox" onChange={(e) => {
                                    e.stopPropagation();
                                    this.props.setTimer(!this.props.timer);}
                                }/>
                                <span className="slider round"/>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom">
                    <p className="small-txt lighter-txt gray">Keep the developer <a target="_blank" rel="noopener noreferrer" className="gray" href="https://www.buymeacoffee.com/cfregly">caffeinated</a></p>
                </div>
            </div>
        )
    }
}
export default addRedux(HomePage);