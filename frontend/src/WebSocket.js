// import React, { createContext } from 'react';
//
// const WebSocketContext = createContext(null)
// export { WebSocketContext }
//
// export default ({ children }) => {
//     let sock;
//     let ws;
//
//     // const dispatch = useDispatch();
//
//     const connect = () => {
//         console.log(children.props.gameID);
//     }
//     // const sendGetOrCreate = (gameID, players) => {
//     //     const payload = {
//     //         game_id: gameID,
//     //         players: players
//     //     }
//     //     sock.send(payload);
//     // }
//
//     // if (!sock) {
//         // create new websocket
//         // sock = new WebSocket("ws://localhost:8080/create");
//
//         // sock.onopen = () => {
//         //     console.log("SOCKET OPEN");
//         //     sock.send({"game_id": "test2", "players": 2})
//         //     console.log("payload sent");
//         // }
//
//         // Update game state information
//         // sock.onmessage = (msg) => {
//         //     console.log(msg);
//         //     let json = JSON.parse(msg.data);
//         //     dispatch(setBoard(json.board));
//         //     dispatch(setTurn(json.turn));
//         //     dispatch(setWinner(json.winner));
//         // }
//         //
//         // // logs that websocket closed
//         // sock.onclose = () => { console.log("SOCKET CLOSED"); }
//         //
//     ws = {
//         sock: sock,
//         connect
//     }
//
//     return (
//         <WebSocketContext.Provider value={ws}>
//             {children}
//         </WebSocketContext.Provider>
//     )
// }