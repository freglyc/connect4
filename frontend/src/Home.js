// Connect4 Home Page

// Ability to generate game link with following options:
// - players: 2 - 4
// - timer: 10 sec or 30 sec

// settings button with the following settings:
// - dark mode toggle
// - color blind mode toggle

import * as React from "react";
import {addRedux} from "./redux/reducer";

class HomePage extends React.Component {
    constructor(props) { super(props); }

    render() {
        return (<div>HOME</div>)
    }
}

export default addRedux(HomePage);