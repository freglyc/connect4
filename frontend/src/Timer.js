// Connect4 Timer Component

import * as React from "react";

export class Timer extends React.Component{
    constructor(props) {
        super(props);
        this.state = { time: props.time }
        this.timer = null;
        this.updated = false;
    }

    tick() {
        if (this.updated === true) {
            this.setState({
                time: this.props.time
            });
            this.updated = false;
        } else if (this.state.time > 0) {
            this.setState({
                time: this.state.time - 1
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
        return (<div className="standard-txt boldest-txt dark">TIME: {this.state.time}</div>)
    }
}