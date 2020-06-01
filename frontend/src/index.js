import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import {Provider} from "react-redux";
import {createStore} from "redux";
import rootReducer from "./redux/reducer";
import { BrowserRouter, Route } from "react-router-dom";

ReactDOM.render(
    <Provider store={createStore(rootReducer)}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Route path="*" component={App} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
