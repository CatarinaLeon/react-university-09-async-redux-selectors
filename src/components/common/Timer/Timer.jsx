import { Component } from 'react';

// export default class Clock extends Component {
//   state = {
//     time: new Date().toLocaleTimeString(),
//   };

//   componentDidMount() {
//     console.log('setInterval');

//     setInterval(
//       () => this.setState({ time: new Date().toLocaleTimeString() }),
//       1000,
//     );
//   }

//   render() {
//     return <div>{this.state.time}</div>;
//   }
// }

export default class Clock extends Component {
  state = {
    time: new Date().toLocaleTimeString(),
  };

  intervalId = null;

  componentDidMount() {
    // console.log('setInterval');
    this.intervalId = setInterval(
      () => this.setState({ time: new Date().toLocaleTimeString() }),
      1000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
    // console.log('clearInterval');
  }

  render() {
    return <div>{this.state.time}</div>;
  }
}
