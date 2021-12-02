import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Answer.css';
import { scoreUser } from '../redux/actions';
// import { userScore } from '../redux/actions';

class Answer extends Component {
  constructor() {
    super();
    this.correctOrIncorrect = this.correctOrIncorrect.bind(this);
  }

  makeScore() {
    const { trivia, countAwnser } = this.props;
    const { getScore } = this.props;
    const count = JSON.parse(localStorage.getItem('count'));
    const difficultyIndex = trivia[countAwnser].difficulty;
    console.log(difficultyIndex);
    const correctAnswer = trivia[countAwnser].correct_answer;
    // const { getscore, difficulty } = this.props;
    const TEN = 10;
    const EASY = 1;
    const MEDIUM = 2;
    const HARD = 3;
    const INCORRECT_ANSWER = 0;
    // const CORRECT_ANSWER = 'correct_answer';
    if (correctAnswer !== 'wrong-answer') {
      switch (difficultyIndex) {
      case 'easy':
        return getScore(TEN + (count * EASY));
      case 'medium':
        return getScore(TEN + (count * MEDIUM));
      case 'hard':
        return getScore(TEN + (count * HARD));
      default:
        break;
      }
      return getScore(INCORRECT_ANSWER);
    }
  }

  correctOrIncorrect(e) {
    const { resultCorrectScore, resultIncorrectScore, count } = this.props;
    document.getElementById('correct-answer').classList.add('greenAnswer');
    Array.from(document.getElementsByName('wrong-answer'))
      .map((answer) => answer.classList.add('redAnswer'));
    resultCorrectScore(e);
    resultIncorrectScore(e);
    localStorage.setItem('count', JSON.stringify(count));
    // sendscore(count);
  }

  render() {
    const { mix, index, isDisabled } = this.props;
    return (
      index === 0 ? (
        <button
          data-testid="correct-answer"
          type="button"
          id="correct-answer"
          disabled={ isDisabled }
          onClick={ (e) => {
            this.correctOrIncorrect(e);
            this.makeScore();
          } }
        // className={colorAnswer && ('greenAnswer')}
        >
          {mix}
        </button>)
        : (
          <div>
            <button
              data-testid={ `wrong-answer-${index}` }
              type="button"
              name="wrong-answer"
              disabled={ isDisabled }
              onClick={ this.correctOrIncorrect }
              className="wrong-answer"
            >
              {mix}
            </button>
          </div>)

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getScore: (score) => dispatch(scoreUser(score)),
});

export default connect(null, mapDispatchToProps)(Answer);

Answer.propTypes = {
  count: PropTypes.number.isRequired, // sendscore: PropTypes.func.isRequired,
  countAwnser: PropTypes.number.isRequired,
  getScore: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  mix: PropTypes.string.isRequired,
  resultCorrectScore: PropTypes.func.isRequired,
  resultIncorrectScore: PropTypes.func.isRequired,
  trivia: PropTypes.arrayOf(PropTypes.object).isRequired,
};
