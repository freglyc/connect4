// Connect4 Settings Page

import * as React from "react";
import {addRedux} from "./redux/reducer";

class SettingsPage extends React.Component {
    render() {
        return (
            <div className="flexbox flex-column flex-center full-height">
                <button className="absolute exit" onClick={(e) => {
                    e.preventDefault();
                    this.props.setPage(this.props.gameID ? "GAME" : "HOME")
                }}/>
                <div className="flexbox flex-column flex-center half-width">
                    <div className="flexbox flex-column flex-center">
                        <h1 className="title-txt large-padding-top"><a className="red remove-hyperlink" href={'http://' + window.location.host}>CONNECT<span className="blue">4</span></a></h1>
                        <h1 className="standard-txt bolder-txt flex-self-end dark">SETTINGS</h1>
                    </div>
                    <div className="full-width large-padding-top">
                        <div className="flexbox space-between full-width">
                            <div>
                                <h2 className="standard-txt boldest-txt dark">DARK MODE</h2>
                                <p className="small-txt gray">darken the mood and may also conserve battery life</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" defaultChecked={this.props.darkMode} onChange={(e) => {
                                    e.stopPropagation();
                                    let toggle = !this.props.darkMode;
                                    this.props.setDarkMode(toggle);
                                    Settings.save({"darkMode": toggle, "colorBlind": this.props.colorBlind});
                                    if (toggle) document.body.setAttribute('data-theme', 'dark');
                                    else document.body.removeAttribute('data-theme')
                                }}/>
                                <span className="slider round"/>
                            </label>
                        </div>
                        <div className="flexbox space-between full-width medium-padding-top">
                            <div>
                                <h2 className="standard-txt boldest-txt dark">COLOR BLIND MODE</h2>
                                <p className="small-txt gray">add patterns to colors to distinguish teams</p>
                            </div>
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
                <div className="absolute bottom">
                    <p className="small-txt lighter-txt gray">Keep the dev <a target="_blank" rel="noopener noreferrer" className="gray" href="https://www.buymeacoffee.com/cfregly">caffeinated</a></p>
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