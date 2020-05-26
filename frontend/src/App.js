import * as React from "react";
import GamePage from "./Game";
import HomePage from "./Home";
import SettingsPage, {Settings} from "./Settings";
import {addRedux} from "./redux/reducer";

class App extends React.Component {
    constructor(props) { super(props); }

    componentDidMount() {
        let settings = Settings.load()
        if (settings !== {}) {
            this.props.setDarkMode(settings.darkMode);
            this.props.setColorBlind(settings.colorBlind);
        }
        if (this.props.gameID) this.props.setPage("GAME");
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