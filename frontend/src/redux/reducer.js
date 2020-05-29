import { combineReducers } from 'redux';
import {connect} from "react-redux";

const INITIAL_STATE = {
    // site data
    page: "HOME",       // current page
    stateID: "",        // current game state ID
    gameID: "",         // ID of current game
    players: 2,         // number of players
    timer: false,       // false if no timer, true if timer
    currentTime: -1,    // time left before turn ends
    time: -1,           // time to refresh to after each turn
    started: false,     // whether or not the game has started

    // settings
    darkMode: false,    // dark mode activated
    colorBlind: false,  // color blind mode activated

    // game data
    color: "Neutral",   // the color of the player
    board: [],        // the game board
    turn: "Neutral",    // the current turn color
    teams: [],          // team colors
    winner: "Neutral",  // the game winner
};

// reducers
const applySetPage = (state, action) => ({ ...state, page: action.page });
const applySetStateID = (state, action) => ({ ...state, stateID: action.stateID });
const applySetGameID = (state, action) => ({ ...state, gameID: action.gameID });
const applySetPlayers = (state, action) => ({ ...state, players: action.players });
const applySetTimer = (state, action) => ({ ...state, timer: action.timer });
const applySetCurrentTime = (state, action) => ({ ...state, currentTime: action.currentTime });
const applySetTime = (state, action) => ({ ...state, time: action.time });
const applySetStarted = (state, action) => ({ ...state, started: action.started });
const applySetDarkMode = (state, action) => ({ ...state, darkMode: action.darkMode });
const applySetColorBlind = (state, action) => ({ ...state, colorBlind: action.colorBlind });
const applySetColor = (state, action) => ({ ...state, color: action.color });
const applySetBoard = (state, action) => ({ ...state, board: action.board });
const applySetTurn = (state, action) => ({ ...state, turn: action.turn });
const applySetTeams = (state, action) => ({ ...state, teams: action.teams })
const applySetWinner = (state, action) => ({ ...state, winner: action.winner });

// reducer
function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'PAGE_SET': { return applySetPage(state, action); }
        case 'STATEID_SET': { return applySetStateID(state, action); }
        case 'GAMEID_SET': { return applySetGameID(state, action); }
        case 'PLAYERS_SET': { return applySetPlayers(state, action); }
        case 'TIMER_SET': { return applySetTimer(state, action); }
        case 'CURRENTTIME_SET': { return applySetCurrentTime(state, action); }
        case 'TIME_SET': { return applySetTime(state, action); }
        case 'STARTED_SET': { return applySetStarted(state, action); }

        case 'DARKMODE_SET': { return applySetDarkMode(state, action); }
        case 'COLORBLIND_SET': { return applySetColorBlind(state, action); }

        case 'COLOR_SET': { return applySetColor(state, action); }
        case 'BOARD_SET': { return applySetBoard(state, action); }
        case 'TURN_SET': { return applySetTurn(state, action); }
        case 'TEAMS_SET': { return applySetTeams(state, action); }
        case 'WINNER_SET': { return applySetWinner(state, action); }
        default: { return state; }
    }
}

const rootReducer = combineReducers({ connect4State: reducer })
export default rootReducer;

/**
 * Add redux data to react component.
 * @param component - the react component to add redux data to.
 * @returns {*} an new component with added redux data.
 */
export function addRedux(component) {
    function mapStateToProps(state) {
        return {
            page: state.connect4State.page,
            stateID:  state.connect4State.stateID,
            gameID: state.connect4State.gameID,
            players: state.connect4State.players,
            timer: state.connect4State.timer,
            currentTime: state.connect4State.currentTime,
            time: state.connect4State.time,
            started: state.connect4State.started,

            darkMode: state.connect4State.darkMode,
            colorBlind: state.connect4State.colorBlind,

            color: state.connect4State.color,
            board: state.connect4State.board,
            turn: state.connect4State.turn,
            teams: state.connect4State.teams,
            winner: state.connect4State.winner,
        };
    }
    const mapDispatchToProps = (dispatch) => ({
        setPage: (page) => { dispatch({type: 'PAGE_SET', page}); },
        setStateID: (stateID) => { dispatch({type: 'StateID_SET', stateID}); },
        setGameID: (gameID) => { dispatch({type: 'GAMEID_SET', gameID}); },
        setPlayers: (players) => { dispatch({type: 'PLAYERS_SET', players}); },
        setTimer: (timer) => { dispatch({type: 'TIMER_SET', timer}); },
        setCurrentTime: (currentTime) => { dispatch({type: 'CURRENTTIME_SET', currentTime}); },
        setTime: (time) => { dispatch({type: 'TIME_SET', time}); },
        setStarted: (started) => { dispatch({type: 'STARTED_SET', started}); },

        setDarkMode: (darkMode) => { dispatch({type: 'DARKMODE_SET', darkMode}); },
        setColorBlind: (colorBlind) => { dispatch({type: 'COLORBLIND_SET', colorBlind}); },

        setColor: (color) => { dispatch({type: 'COLOR_SET', color}); },
        setBoard: (board) => { dispatch({type: 'BOARD_SET', board}); },
        setTurn: (turn) => { dispatch({type: 'TURN_SET', turn}); },
        setTeams: (teams) => { dispatch({type: 'TEAMS_SET', teams}); },
        setWinner: (winner) => { dispatch({type: 'WINNER_SET', winner}); }
    });
    return connect(mapStateToProps, mapDispatchToProps)(component);
}