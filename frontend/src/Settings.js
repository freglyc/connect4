// Connect4 Settings Page

// Settings:
// - dark mode toggle
// - color blind mode toggle

// X in corner


import * as React from "react";
import {addRedux} from "./redux/reducer";

class SettingsPage extends React.Component {
    render() {
        return (
            <div>
                <h1>SETTINGS</h1>
                <button onClick={(e) => {
                    e.preventDefault();
                    this.props.setPage(this.props.gameID ? "GAME" : "HOME")
                }}>BACK</button>
                <div>
                    <div>
                        Dark Mode
                        <label className="switch">
                            <input type="checkbox" defaultChecked={this.props.darkMode} onChange={(e) => {
                                e.stopPropagation();
                                let toggle = !this.props.darkMode;
                                this.props.setDarkMode(toggle);
                                Settings.save({"darkMode": toggle, "colorBlind": this.props.colorBlind});
                            }}/>
                            <span className="slider round"/>
                        </label>
                    </div>
                    <div>
                        Color Blind Mode
                        <label className="switch">
                            <input type="checkbox" defaultChecked={this.props.colorBlind} onChange={(e) => {
                                e.stopPropagation();
                                let toggle = !this.props.colorBlind;
                                this.props.setColorBlind(toggle);
                                Settings.save({"darkMode": this.props.darkMode, "colorBlind": toggle});
                            }}/>
                            <span className="slider round"/>
                        </label>
                    </div>
                </div>
            </div>
        )
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