import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/login.css';
import { userEmail, fetchTokenAPI, userName } from '../redux/actions';
import trivia from '../trivia.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.pageSetings = this.pageSetings.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleClick(e) {
    e.preventDefault();
    const { getEmail, history, getToken, getName } = this.props;
    const { email, name } = this.state;
    const tokens = await getToken();
    localStorage.setItem('token', JSON.stringify(tokens.payload));
    history.push('/game-page');
    getEmail(email);
    getName(name);
  }

  validateStartButton(name, email) {
    return !(name.length > 0 && email.length > 0);
  } // depois enviar para serviçes

  pageSetings(e) {
    e.preventDefault();
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const {
      state: { email, name },
      handleChange,
      handleClick,
      validateStartButton,
    } = this;

    return (
      <div className="container col-12 col-md-9" id="form-container">
        <div className="row align-items-center gx-5">
          <div className="col-md-6 order-2">
            <h2>Faça o login para jogar</h2>
            <form>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={ email }
                  placeholder="Digite o email"
                  onChange={ handleChange }
                />
                <label htmlFor="email" className="form-label">Digite seu email</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={ name }
                  placeholder="Digite o nome"
                  onChange={ handleChange }
                />
                <label htmlFor="name" className="form-label">Digite seu nome</label>
              </div>
              <button
                className="btn btn-primary"
                disabled={ validateStartButton(email, name) }
                type="submit"
                onClick={ handleClick }
              >
                Jogar
              </button>
            </form>
          </div>
          <div className="col-md-6 order-1">
            <div className="col-12 trivia-img">
              <img className="img-fluid" src={ trivia } alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  getEmail: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired,
  getName: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getEmail: (state) => dispatch(userEmail(state)),
  getToken: () => dispatch(fetchTokenAPI()),
  getName: (state) => dispatch(userName(state)),
});

export default connect(null, mapDispatchToProps)(Login);
