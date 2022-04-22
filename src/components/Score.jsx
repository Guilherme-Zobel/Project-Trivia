import React, { Component } from 'react';
import { connect } from 'react-redux';

class Score extends Component {
  render() {
    const count = JSON.parse(localStorage.getItem('count')) || [];
    return (
      <div>
        { count }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getscore: state.user.player.score,
  difficulty: state.user.trivia,
});

export default connect(mapStateToProps)(Score);
