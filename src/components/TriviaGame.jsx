import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Answer from './Answer';
import { triviaApi, sumCorrect } from '../redux/actions';

class TriviaGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trivia: [],
      countAwnser: 0,
      correctScore: 0,
      incorrectScore: 0,
      count: 30,
      isDisabled: false,
      visibleButton: false,
    };

    this.responseApi = this.responseApi.bind(this);
    this.makeEstrutureTrivia = this.makeEstrutureTrivia.bind(this);
    this.convert = this.convert.bind(this);
    this.resultCorrectScore = this.resultCorrectScore.bind(this);
    this.resultIncorrectScore = this.resultIncorrectScore.bind(this);
    this.visibleButton = this.visibleButton.bind(this);
    this.unvisibleButton = this.unvisibleButton.bind(this);
    this.sendFeedback = this.sendFeedback.bind(this);
    this.countCorrect = this.countCorrect.bind(this);
  }

  componentDidMount() {
    this.responseApi();
    this.delayToStart();
  }

  componentDidUpdate() {
    const MIN_SECOND = 0;
    const { count } = this.state;
    if (count === MIN_SECOND) {
      return (
        this.componentWillUnmount(),
        this.resetCount()
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  delayToStart() {
    const TIMEOUT = 5000;
    this.setState({ isDisabled: true });
    setTimeout(() => {
      this.startingTime();
      this.setState({ isDisabled: false });
    }, TIMEOUT);
  }

  startingTime() {
    const TIME = 1000;
    this.timerInterval = setInterval(() => {
      this.setState((prevState) => ({ count: prevState.count - 1 }));
    }, TIME);
  }

  resetCount() {
    this.setState({
      count: 'tempo esgotado',
      isDisabled: true,
    });
    this.setState((prevState) => ({
      incorrectScore: prevState.incorrectScore + 1,
    }));
  }

  async responseApi() {
    const token = JSON.parse(localStorage.getItem('token'));
    const URL_TRIVIA = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(URL_TRIVIA);
    const getJson = await response.json();
    const result = getJson.results;
    this.setState({
      trivia: result,
    });
    const { trivia } = this.state;
    const { getTrivia } = this.props;
    getTrivia(trivia);
  }

  convert(str) {
    str = str.replace(/&quot;/g, '"');
    return str;
  }

  resultCorrectScore({ target }) {
    if (target.id === 'correct-answer') {
      this.visibleButton();
      this.setState((preventState) => ({
        correctScore: preventState.correctScore + 1,
        isDisabled: true,
      }));
    }
  }

  resultIncorrectScore({ target }) {
    if (target.name === 'wrong-answer') {
      this.visibleButton();
      this.setState((preventState) => ({
        incorrectScore: preventState.incorrectScore + 1,
        isDisabled: true,
      }));
    }
  }

  visibleButton() {
    this.setState(
      {
        visibleButton: true,
      },
    );
  }

  unvisibleButton() {
    this.setState(
      {
        visibleButton: false,
      },
    );
  }

  sendFeedback() {
    const { countAwnser } = this.state;
    const { history } = this.props;
    const THREE = 3;
    if (countAwnser > THREE) {
      history.push('/feedback');
    }
  }

  makeEstrutureTrivia(trivia, initialIndex) {
    const mixedArray = [trivia[initialIndex].correct_answer,
      ...trivia[initialIndex].incorrect_answers];
    const { visibleButton } = this.state;
    return (
      <div id={ initialIndex }>
        <h3 data-testid="question-category">{trivia[initialIndex].category}</h3>
        <h3 data-testid="question-text">
          titulo:
          {this.convert(trivia[initialIndex].question)}
        </h3>

        {mixedArray.map((mix, index) => (
          <Answer
            resultCorrectScore={ this.resultCorrectScore }
            resultIncorrectScore={ this.resultIncorrectScore }
            unvisibleButton={ this.unvisibleButton }
            mix={ mix }
            { ...this.state }
            index={ index }
            makeScore={ this.makeScore }
            key={ `${mix}-${index}` }
            sendFeedback={ this.sendFeedback }
            countCorrect={ this.countCorrect }
          />
        ))}
        <hr />
        { visibleButton && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ () => {
              this.setState((prevState) => ({
                countAwnser: prevState.countAwnser + 1,
                count: 30,
                isDisabled: false,
              }));
              this.componentWillUnmount();
              this.delayToStart();
              this.componentDidUpdate();
              // this.sendFeedback();
              // this.countCorrect();
            } }
          >
            Próxima pergunta
          </button>
        )}
      </div>
    );
  }

  countCorrect() {
    const { correctScore } = this.state;
    const { sendScore } = this.props;
    sendScore(correctScore);
  }

  render() {
    const { trivia, countAwnser, correctScore, incorrectScore, count } = this.state;
    const { player } = this.props;
    const state = { player };
    localStorage.setItem('state', JSON.stringify(state));
    return (
      <div>
        <h2>Trivia game</h2>
        {trivia.length === 0 ? (<p>carregando...</p>)
          : this.makeEstrutureTrivia(trivia, countAwnser)}
        <h3>
          {`Timer = ${count}`}
        </h3>
        <h3>
          {`Correct Score =  
          ${correctScore}`}
        </h3>
        <h3>
          {`Incorrect Score = 
          ${incorrectScore}`}
        </h3>
      </div>
    );
  }
}

TriviaGame.propTypes = {
  getTrivia: PropTypes.func.isRequired,
  player: PropTypes.objectOf(PropTypes.string).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  sendScore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  arrayTrivia: state.trivia,
  player: state.user.player,
});

const mapDispatchToProps = (dispatch) => ({
  getTrivia: (trivia) => dispatch(triviaApi(trivia)),
  sendScore: (correctNumber) => dispatch(sumCorrect(correctNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TriviaGame);
