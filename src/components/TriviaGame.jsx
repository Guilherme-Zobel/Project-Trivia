import React from 'react';
import Answer from './Answer';

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
    };

    this.responseApi = this.responseApi.bind(this);
    this.makeEstrutureTrivia = this.makeEstrutureTrivia.bind(this);
    this.convert = this.convert.bind(this);
    this.resultCorrectScore = this.resultCorrectScore.bind(this);
    this.resultIncorrectScore = this.resultIncorrectScore.bind(this);
    this.resetCount = this.resetCount.bind(this);
  }

  componentDidMount() {
    this.responseApi();
    this.startingTime();
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
    this.setState({ trivia: result });
  }

  convert(str) {
    str = str.replace(/&quot;/g, '"');
    return str;
  }

  resultCorrectScore({ target }) {
    if (target.id === 'correct-answer') {
      this.setState((preventState) => ({
        correctScore: preventState.correctScore + 1,
      }));
    }
  }

  resultIncorrectScore({ target }) {
    console.log(target.name);
    if (target.name === 'wrong-answer') {
      this.setState((preventState) => ({
        incorrectScore: preventState.incorrectScore + 1,
      }));
    }
  }

  makeEstrutureTrivia(trivia, initialIndex) {
    const { isDisabled } = this.state;
    const mixedArray = [trivia[initialIndex].correct_answer,
      ...trivia[initialIndex].incorrect_answers];
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
            mix={ mix }
            index={ index }
            isDisabled={ isDisabled }
            key={ `${mix}-${index}` }
          />
        ))}
        <hr />
        <button
          type="button"
          onClick={ () => {
            this.setState((prevState) => ({
              countAwnser: prevState.countAwnser + 1,
              count: 30,
            }));
            this.componentDidUpdate();
          } }
        >
          Próxima pergunta
        </button>
      </div>
    );
  }

  render() {
    const { trivia, countAwnser, correctScore, incorrectScore, count } = this.state;
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

export default TriviaGame;
