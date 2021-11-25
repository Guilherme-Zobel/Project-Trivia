import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userEmail } from '../redux/actions';
// // import signInAction from '../actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleClick(e) {
    e.preventDefault();
    const { getEmail } = this.props;
    const { email } = this.state;
    getEmail(email);
  }

  validateStartButton(name, email) {
    return !(name.length > 0 && email.length > 0);
  } // depois enviar para serviçes

  render() {
    const {
      state: { email, name },
      handleChange,
      handleClick,
      validateStartButton,
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
      </form>
    );
  }
}

Login.propTypes = {
  getEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getEmail: (state) => dispatch(userEmail(state)),
});

export default connect(null, mapDispatchToProps)(Login);
