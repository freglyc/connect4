import { combineReducers } from 'redux';
import {connect} from "react-redux";

const INITIAL_STATE = {
    // site data
    page: "HOME",       // page the user is currently on
    gameID: null,       // ID of current game
    timer: null,        // null if no timer, int representing time per turn otherwise

    // settings
    darkMode: false,    // dark mode activated
    colorBlind: false,  // color blind mode activated

    // game data
    color: "Neutral",   // the color of the player
    board: null,        // the game board
    turn: "Neutral",    // the current turn color
    winner: "Neutral",  // the game winner
};

const applySetPage = (state, action) => ({
    ...state,
    page: action.page
});

const applySetGameID = (state, action) => ({
    ...state,
    panel: action.gameID
});

const applySetTimer = (state, action) => ({
    ...state,
    timer: action.timer
})

const applySetDarkMode = (state, action) => ({
    ...state,
    darkMode: action.darkMode
});

const applySetColorBlind = (state, action) => ({
    ...state,
    colorBlind: action.colorBlind
});

const applySetColor = (state, action) => ({
    ...state,
    color: action.color
});

const applySetBoard = (state, action) => ({
    ...state,
    board: action.board
});

const applySetTurn = (state, action) => ({
    ...state,
    turn: action.turn
});

const applySetWinner = (state, action) => ({
    ...state,
    winner: action.winner
});

function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'PAGE_SET': { return applySetPage(state, action); }
        case 'GAMEID_SET': { return applySetGameID(state, action); }
        case 'TIMER_SER': { return applySetTimer(state, action); }

        case 'DARKMODE_SET': { return applySetDarkMode(state, action); }
        case 'COLORBLIND_SET': { return applySetColorBlind(state, action); }

        case 'COLOR_SET': { return applySetColor(state, action); }
        case 'BOARD_SET': { return applySetBoard(state, action); }
        case 'TURN_SET': { return applySetTurn(state, action); }
        case 'WINNER_SET': { return applySetWinner(state, action); }
        default: { return state; }
    }
}

const rootReducer = combineReducers({
    connect4State: reducer
})

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
            gameID: state.connect4State.gameID,
            timer: state.connect4State.timer,

            darkMode: state.connect4State.darkblue,
            colorBlind: state.connect4State.colorBlind,

            color: state.connect4State.color,
            board: state.connect4State.board,
            turn: state.connect4State.turn,
            winner: state.connect4State.winner,
        };
    }
    const mapDispatchToProps = (dispatch) => ({
        setPage: (page) => { dispatch({type: 'PAGE_SET', page}); },
        setGameIDe: (gameID) => { dispatch({type: 'GAMEID_SET', gameID}); },
        setTimer: (timer) => { dispatch({type: 'TIMER_SET', timer}); },

        setDarkMode: (darkMode) => { dispatch({type: 'DARKMODE_SET', darkMode}); },
        setColorBlind: (colorBlind) => { dispatch({type: 'COLORBLIND_SET', colorBlind}); },

        setColor: (color) => { dispatch({type: 'COLOR_SET', color}); },
        setBoard: (board) => { dispatch({type: 'BOARD_SET', board}); },
        setTurn: (turn) => { dispatch({type: 'TURN_SET', turn}); },
        setWinner: (winner) => { dispatch({type: 'WINNER_SET', winner}); }
    });
    return connect(mapStateToProps, mapDispatchToProps)(component);
}