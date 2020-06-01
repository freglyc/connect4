// Connect4 App Page

import * as React from "react";
import GamePage from "./Game";
import HomePage from "./Home";
import SettingsPage, {Settings} from "./Settings";
import {addRedux} from "./redux/reducer";
import axios from "axios";
import {server} from "./Network";

class App extends React.Component {
    constructor(props) {
        super(props);
        // Load settings
        let settings = Settings.load();
        if (settings.darkMode) {
            this.props.setDarkMode(settings.darkMode);
            document.body.setAttribute('data-theme', 'dark');
        } else document.body.removeAttribute('data-theme')

        if (settings.colorBlind) { this.props.setColorBlind(settings.colorBlind); }
    }

    componentDidMount() {
        // Set game if in one
        if (document.location.pathname !== "/") {
            this.props.setGameID(document.location.pathname.slice(1));
            let data = {"game_id": this.props.gameID, "players": 2, "timer": false};
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
                sock.onclose = () => {}
            })
            this.props.setPage("GAME");
        }
    }

    render() {
        let page = <HomePage/>;
        if (this.props.page === "HOME") page = <HomePage/>;
        else if (this.props.page === "GAME") page = <GamePage/>;
        else if (this.props.page === "SETTINGS") page = <SettingsPage/>;
        return ( <div>{ page }</div> );
    }
}
export default addRedux(App);