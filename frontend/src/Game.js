// Connect4 Game Page

import * as React from "react";
import {addRedux} from "./redux/reducer";

class GamePage extends React.Component {
    constructor(props) { super(props); }

    /**
     * Set the game state given json
     * @param gameState - json representation of game state
     */
    setGameState(gameState) {
        // TODO set board
        this.props.setTurn(gameState.turn);
        this.props.setWinner(gameState.winner);
    }

    render() {
        return (<div>GAME</div>)
    }
}

export default addRedux(GamePage);