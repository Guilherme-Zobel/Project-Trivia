import React, { Component } from 'react';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      count: 30,
    };
  }

  componentDidMount() {
    const TIME = 1000;
    this.timerInterval = setInterval(() => {
      this.setState((prevState) => ({ count: prevState.count - 1 }));
    }, TIME);
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  render() {
    const { count } = this.state;
    return (
      count === 0 ? (this.setState({ count: 0 })) : (
        <div>
          <h3>
            {`Timer = ${count}`}
          </h3>
        </div>)

    );
  }
}

export default Timer;
