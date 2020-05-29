// Connect4 Game Page

import * as React from "react";
import {addRedux} from "./redux/reducer";
import axios from 'axios';
import {Timer} from "./Timer";

class GamePage extends React.Component {
    /**
     * POST place - send a place token request
     * @param column - the column to place the token
     */
    place(column) { axios.post('http://localhost:8080/place', {"game_id": this.props.gameID, "color": this.props.color, "column": column}).then(_ => {}) }

    /**
     * POST reset - send a reset request
     */
    reset() { axios.post('http://localhost:8080/reset', {"game_id": this.props.gameID}).then(_ => {}) }

    render() {
        return (
            <div className="flexbox flex-column flex-center full-height">
                <div className="flexbox flex-column flex-center test-width">
                    <h1 className="title-txt large-padding-top"><a className="red remove-hyperlink" href={'http://' + window.location.host}>CONNECT<span className="blue">4</span></a></h1>
                    <p className="flex-self-start small-txt lighter-txt dark medium-padding-top">share this link with friends <a className="dark" href={"https://" +  window.location.host + "/" + this.props.gameID}>{"https://" +  window.location.host + "/" + this.props.gameID}</a></p>
                    <hr className="full-width dark"/>
                    <div className="full-width">
                        <div className="flexbox space-between full-width small-padding-top">
                            <div className="flexbox">
                                { this.props.teams.map((team) =>
                                    <div key={team + "-div"} className={"color-input " + team.toLowerCase() + "-input-background"}>
                                        <input key={team + "-input"} id={team} onClick={e => {
                                        e.stopPropagation();
                                        this.props.setColor(e.target.value)
                                        }} name="color" type="radio" value={team}/>
                                        <label key={team + "-label"} htmlFor={team}
                                               className={team.toLowerCase() + " boldest-txt small-txt " + team.toLowerCase() + "-border"}>
                                            {team.toLowerCase()}</label>
                                    </div>
                                ) }
                            </div>
                            <div className="flexbox">
                                <p className={this.props.turn.toLocaleLowerCase() + " medium-txt boldest-txt flex-self-end"}>{
                                    this.props.winner !== "Neutral" ?
                                        this.props.winner.toLowerCase() + " wins!" :
                                        this.props.turn.toLowerCase() + " turn"
                                }</p>
                            </div>
                        </div>
                        <div className="flexbox flex-column flex-center small-margin-top blue-background small-padding">
                            <div className="board">{
                                this.props.board.map((row, idx1) => {
                                    return (
                                        <div key={"rpw-" + idx1} className="full-width flexbox space-between">
                                            {row.map((tile, idx2) => {
                                                return <button className="tile" key={idx1 + "," + idx2} onClick={ e => {
                                                    e.preventDefault();
                                                    this.place(idx2);
                                                }}>
                                                    <div className={tile.toLowerCase() + "-background"}/>
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
                                    <Timer time={this.props.time} turn={this.props.turn}/> :
                                    this.props.timer ?
                                        <div className="standard-txt boldest-txt dark">TIME: {this.props.time}</div> :
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
                <div className="absolute bottom">
                    <p className="small-txt lighter-txt gray">Created by <a className="gray" href="https://www.cfregly.com">Chris Fregly</a></p>
                </div>
            </div>
        )
    }
}
export default addRedux(GamePage);