import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userEmail, fetchTokenAPI } from '../redux/actions';

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

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleClick(e) {
    e.preventDefault();
    const { getEmail, history, getToken } = this.props;
    const { email } = this.state;
    const tokens = await getToken();
    localStorage.setItem('token', JSON.stringify(tokens.payload));
    history.push('/game-page');
    getEmail(email);
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
      pageSetings,
    } = this;

    return (
      <form>
        <input
          type="email"
          name="email"
          value={ email }
          placeholder="Digite o email"
          data-testid="input-gravatar-email"
          onChange={ handleChange }
        />
        <input
          type="text"
          name="name"
          value={ name }
          placeholder="Digite o nome"
          data-testid="input-player-name"
          onChange={ handleChange }
        />
        <button
          disabled={ validateStartButton(email, name) }
          type="submit"
          data-testid="btn-play"
          onClick={ handleClick }
        >
          Jogar
        </button>
        <button
          type="button"
          onClick={ pageSetings }
          data-testid="btn-settings"
        >
          Settings
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  getEmail: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getEmail: (state) => dispatch(userEmail(state)),
  getToken: () => dispatch(fetchTokenAPI()),
});

export default connect(null, mapDispatchToProps)(Login);
