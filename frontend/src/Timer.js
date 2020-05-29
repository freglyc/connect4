// Connect4 Timer Component

import * as React from "react";

export class Timer extends React.Component{
    constructor(props) {
        super(props);
        this.state = { currentTime: props.currentTime }
        this.timer = null;
        this.updated = false;
    }

    tick() {
        if (this.props.winner !== "Neutral") {
            clearInterval(this.timer)
            this.setState({
                currentTime: this.props.time
            });
        } else if (this.updated === true) {
            this.setState({
                currentTime: this.props.currentTime
            });
            this.updated = false;
        } else if (this.state.currentTime > 0) {
            this.setState({
                currentTime: this.state.currentTime - 1
            });
        }
    }

    componentDidMount() { this.timer = setInterval(() => this.tick(), 1000); }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.turn !== this.props.turn) {
            clearInterval(this.timer);
            this.updated = true;
            this.timer = setInterval(() => this.tick(), 1000)
        }
    }

    componentWillUnmount() { clearInterval(this.timer); }

    render() {
        return (<div className="standard-txt boldest-txt dark">time: {this.state.currentTime}</div>)
    }
}