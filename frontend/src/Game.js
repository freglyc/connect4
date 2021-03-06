// Connect4 Game Page

import * as React from "react";
import {addRedux} from "./redux/reducer";
import axios from 'axios';
import {Timer} from "./Timer";
import defaultFavicon from "./assets/defaultFavicon.ico"
import redFavicon from "./assets/redFavicon.ico"
import blueFavicon from "./assets/blueFavicon.ico"
import yellowFavicon from "./assets/yellowFavicon.ico"
import greenFavicon from "./assets/greenFavicon.ico"
import {server} from "./Network";


class GamePage extends React.Component {

    componentDidUpdate(prevProps, prevState) {
        if (this.props.winner !== "Neutral") {
            document.getElementById("favicon").setAttribute("href", defaultFavicon);
        } else {
            let favi;
            if (this.props.turn === "Red") favi = redFavicon;
            else if (this.props.turn === "Yellow") favi = yellowFavicon;
            else if (this.props.turn === "Green") favi = greenFavicon;
            else if (this.props.turn === "Blue") favi = blueFavicon;
            else favi = defaultFavicon;
            document.getElementById("favicon").setAttribute("href", favi);
        }
    }

    /**
     * POST place - send a place token request
     * @param column - the column to place the token
     */
    place(column) {
        if (this.props.timeout) return
        axios.post('https://' + server + '/place', {"game_id": this.props.gameID, "color": this.props.color, "column": column}).then(_ => {})
    }

    /**
     * POST reset - send a reset request
     */
    reset() {
        if (this.props.timeout) return
        axios.post('https://' + server + '/reset', {"game_id": this.props.gameID}).then(_ => {})
    }

    render() {
        let turn = (this.props.winner !== "Neutral") ? this.props.winner.toLocaleLowerCase() : this.props.turn.toLocaleLowerCase()
        let borders = (this.props.colorBlind) ? "-blind-border" : "-border";
        let tileBorders = (this.props.colorBlind) ? "-tile-blind-border" : "";
        return (
            <div className="flexbox flex-column flex-center full-height">
                { this.props.timeout ? <div className="banner standard-txt flexbox flex-center flex-column full-width">
                    Connection timeout. Please refresh the page.
                </div> : null }
                <div className="flexbox flex-column flex-center game-width">
                    <h1 className="title-txt large-padding-top"><a className="red remove-hyperlink" href={'http://' + window.location.host}>CONNECT<span className="blue">4</span></a></h1>
                    <p className="flex-self-start small-txt lighter-txt dark medium-padding-top">Share this link with friends: <a className="dark" href={"https://" +  window.location.host + "/" + this.props.gameID}>{"https://" +  window.location.host + "/" + this.props.gameID}</a></p>
                    <hr className="full-width dark"/>
                    <div className="full-width">
                        <div className="flexbox space-between full-width small-padding-top">
                            <div className="flexbox">
                                { this.props.teams.map((team) =>
                                    <div key={team + "-div"} className={"color-input " + team.toLowerCase() + "-input-background " + team.toLowerCase() + borders }>
                                        <input defaultChecked={this.props.color === team} key={team + "-input"} id={team} onClick={e => {
                                        e.stopPropagation();
                                        this.props.setColor(e.target.value)
                                        }} name="color" type="radio" value={team}/>
                                        <label key={team + "-label"} htmlFor={team}
                                               className={team.toLowerCase() + " boldest-txt small-txt"}>
                                            {team.toLowerCase()}</label>
                                    </div>
                                ) }
                            </div>
                            <div className="flexbox">
                                <p className={turn + " standard-txt boldest-txt flex-self-end"}>{
                                    this.props.winner !== "Neutral" ?
                                        this.props.winner.toLowerCase() + " wins!" :
                                        this.props.turn.toLowerCase() + " turn"
                                }</p>
                            </div>
                        </div>
                        <div className="flexbox flex-column flex-center small-margin-top blue-background small-padding">
                            <div className="full-width">{
                                this.props.board.map((row, idx1) => {
                                    return (
                                        <div key={"rpw-" + idx1} className="full-width flexbox space-between">
                                            {row.map((tile, idx2) => {
                                                return <button className="tile" key={idx1 + "," + idx2} onClick={ e => {
                                                    e.preventDefault();
                                                    this.place(idx2);
                                                }}>
                                                    <div className={tile.toLowerCase() + "-background " + tile.toLowerCase() + tileBorders}/>
                                                </button>
                                            })}
                                        </div>
                                    )
                                })
                            }</div>
                        </div>
                        <div className="flexbox space-between full-width small-padding-top">
                            {
                                this.props.started && this.props.timer ?
                                    <Timer time={this.props.time} currentTime={this.props.currentTime} turn={this.props.turn} winner={this.props.winner}/> :
                                    this.props.timer ?
                                        <div className="standard-txt boldest-txt dark">time: {this.props.time}</div> :
                                        <div/>
                            }
                            <div className="flexbox flex-center">
                                <div className="flexbox flex-center small-padding-right">
                                    <button className="fas fa-cog dark gear" onClick={(e) => {
                                        e.preventDefault();
                                        this.props.setPage("SETTINGS");
                                    }}/>
                                </div>
                                <div className="flexbox flex-center">
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        this.reset();
                                    }} className="resetBtn smallest-txt bolder-txt">new game</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom dev">
                    <p className="small-txt lighter-txt gray">Keep the developer <a target="_blank" rel="noopener noreferrer" className="gray" href="https://www.buymeacoffee.com/cfregly">caffeinated</a></p>
                </div>
            </div>
        )
    }
}
export default addRedux(GamePage);