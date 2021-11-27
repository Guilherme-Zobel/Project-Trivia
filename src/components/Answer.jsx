import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../styles/Answer.css';

export default class Answer extends Component {
  constructor() {
    super();
    this.correctOrIncorrect = this.correctOrIncorrect.bind(this);
  }

  correctOrIncorrect() {
    document.getElementById('correct-answer').classList.add('greenAnswer');
    Array.from(document.getElementsByName('wrong-answer'))
      .map((answer) => answer.classList.add('redAnswer'));
  }

  render() {
    const { mix, index } = this.props;
    return (
      index === 0 ? (
        <button
          data-testid="correct-answer"
          type="button"
          id="correct-answer"
          onClick={ this.correctOrIncorrect }
        // className={colorAnswer && ('greenAnswer')}
        >
          {mix}
        </button>)
        : (
          <button
            data-testid={ `wrong-answer-${index}` }
            type="button"
            name="wrong-answer"
            onClick={ this.correctOrIncorrect }
            className="wrong-answer"
          >
            {mix}
          </button>)
    );
  }
}

Answer.propTypes = {
  mix: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
