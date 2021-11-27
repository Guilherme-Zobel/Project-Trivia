import React from 'react';

class TriviaGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trivia: [],
      // wrongAsnwer: 0,
    };

    this.responseApi = this.responseApi.bind(this);
    this.makeEstrutureTrivia = this.makeEstrutureTrivia.bind(this);
    this.convert = this.convert.bind(this);
  }

  componentDidMount() {
    this.responseApi();
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

  makeEstrutureTrivia(trivia, initialIndex) {
    const misturar = [trivia[initialIndex].correct_answer,
      ...trivia[initialIndex].incorrect_answers];
    return (
      <div id={ initialIndex }>
        <h3 data-testid="question-category">{trivia[initialIndex].category}</h3>
        <h3 data-testid="question-text">
          titulo:
          {this.convert(trivia[initialIndex].question)}
        </h3>
        <div>
          {misturar.map((mist, index) => (index === 0 ? (
            <button type="button" data-testid="correct-answer">{mist}</button>)
            : (
              <button type="button" data-testid={ `wrong-answer-${index}` }>
                {mist}
              </button>)
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { trivia } = this.state;
    return (
      <div>
        <h2>Trivia game</h2>
        {trivia.length === 0 ? (<p>carregando...</p>)
          : this.makeEstrutureTrivia(trivia, 0)}
      </div>
    );
  }
}

export default TriviaGame;

/* trivia.map(({
      category, question,
      correct_answer, incorrect_answers,
    }, index) => (
      <div key={ index }>
        <h3 data-testid="question-category">{category}</h3>
        <h3 data-testid="question-text">
          titulo:
          {this.convert(question)}
        </h3>
      </div>
    )); */

/*     (({
      category, question,
      correct_answer, incorrect_answers,
    }) => */

/*     <button type="button" key={ index }>
              {mist === mist[0]}
            </button> */
