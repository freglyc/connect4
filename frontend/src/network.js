let jquery = require('jquery');
window.$ = window.jQuery = jquery;

/**
 * Joins a game and opens a websocket for future updates
 * @param data - {"game_id": string, "players": int}
 * @param gamePage - the game page displayed to the user
 */
function join(data, gamePage) {
    let socket = new WebSocket("ws://localhost:8080/create");
    socket.onopen = function () {
        console.log("socket opened to game: " + data[game_id]);
        socket.send(data.toString())
    }
    socket.onmessage = function (msg) {
        console.log("update received from game: " + data[game_id]);
        // TODO also update window URL here as well
        let gameState = JSON.parse(msg.data);
        gamePage.setGameState(gameState);
    }
}

/**
 * POST place - send a place token request
 * @param data - {"game_id": string, "column": int}
 */
function place(data) {
    $.ajax({
        url: '/place',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: data => {
            console.log("place " + data)
        }
    });
}

/**
 * POST next = send a next turn request
 * @param data - {"game_id": string}
 */
function next(data) {
    $.ajax({
        url: '/next',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: data => {
            console.log("next " + data)
        }
    });
}

/**
 * POST reset - send a reset request
 * @param data - {"game_id": string}
 */
function reset(data) {
    $.ajax({
        url: '/reset',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: data => {
            console.log("reset " + data)
        }
    });
}
