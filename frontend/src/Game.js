// Connect4 Game Page

import * as React from "react";
import {addRedux} from "./redux/reducer";

class GamePage extends React.Component {
    constructor(props) { super(props); }

    /**
     * POST place - send a place token request
     * @param data - {"game_id": string, "column": int}
     */
    place(data) {
        // $.ajax({
        //     url: '/place',
        //     type: 'POST',
        //     data: JSON.stringify(data),
        //     contentType: 'application/json; charset=utf-8',
        //     dataType: 'json',
        //     success: data => {
        //         console.log("place " + data)
        //     }
        // });
    }

    /**
     * POST next = send a next turn request
     * @param data - {"game_id": string}
     */
    next(data) {
        // $.ajax({
        //     url: '/next',
        //     type: 'POST',
        //     data: JSON.stringify(data),
        //     contentType: 'application/json; charset=utf-8',
        //     dataType: 'json',
        //     success: data => {
        //         console.log("next " + data)
        //     }
        // });
    }

    /**
     * POST reset - send a reset request
     * @param data - {"game_id": string}
     */
    reset(data) {
        // $.ajax({
        //     url: '/reset',
        //     type: 'POST',
        //     data: JSON.stringify(data),
        //     contentType: 'application/json; charset=utf-8',
        //     dataType: 'json',
        //     success: data => {
        //         console.log("reset " + data)
        //     }
        // });
    }

    render() {
        return (<div>GAME</div>)
    }
}

export default addRedux(GamePage);