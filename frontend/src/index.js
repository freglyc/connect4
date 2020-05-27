import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import {Provider} from "react-redux";
import {createStore} from "redux";
import rootReducer from "./redux/reducer";
import WebSocketProvider from './WebSocket';

ReactDOM.render(
    <Provider store={createStore(rootReducer)}>
        <WebSocketProvider>
            <App/>
        </WebSocketProvider>
    </Provider>,
    document.getElementById('root')
);
