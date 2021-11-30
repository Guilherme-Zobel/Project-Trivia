// import React, { Component } from 'react';

// class Timer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       count: 5,
//     };
//     this.resetCount = this.resetCount.bind(this);
//   }

//   componentDidMount() {
//     const TIME = 1000;
//     this.timerInterval = setInterval(() => {
//       this.setState((prevState) => ({ count: prevState.count - 1 }));
//     }, TIME);
//   }

//   componentDidUpdate() {
//     const MIN_SECOND = -1;
//     const { count } = this.state;
//     if (count === MIN_SECOND) { this.resetCount(); }
//   }

//   resetCount() {
//     this.setState({ count: 30 });
//   }

//   render() {
//     const { count } = this.state;
//     return (
//       <div>
//         <h3>
//           {`Timer = ${count}`}
//         </h3>
//       </div>);
//   }
// }

// export default Timer;
