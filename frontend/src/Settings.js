// Connect4 Settings Page

// Settings:
// - dark mode toggle
// - color blind mode toggle

// X in corner


import * as React from "react";
import {addRedux} from "./redux/reducer";

class SettingsPage extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (<div>SETTINGS</div>)
    }
}

export default addRedux(SettingsPage);

// Saves settings to local storage
export class Settings {
    // Load settings from location storage if there
    static load() { return JSON.parse(window.localStorage.getItem('settings')) || {}; }
    // Save settings to local storage
    static save(settings) { window.localStorage.setItem('settings', JSON.stringify(settings)); }
}