import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import trivia from '../trivia.png';
import '../styles/header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      imageApi: '',
    };
    this.getInformationApi = this.getInformationApi.bind(this);
  }

  componentDidMount() {
    this.getInformationApi();
  }

  async getInformationApi() {
    const { email } = this.props;
    const hash = md5(email).toString();
    const profileUser = await fetch(`https://www.gravatar.com/avatar/${hash}`);
    this.setState({ imageApi: profileUser.url });
  }

  render() {
    const { name, score } = this.props;
    const { imageApi } = this.state;
    return (
      <header className="header">
        <div className="info-header">
          <h1>
            Score:
            <span>
              {score}
            </span>
          </h1>
          <img src={ imageApi } alt="imagem" />
        </div>
        <div className="img-header">
          <img className="img-fluid" src={ trivia } alt="imagem" />
        </div>
        <p>{name}</p>
        {/* </div> */}
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.player.gravatarEmail,
  name: state.user.player.name,
  score: state.user.player.score,
});

export default connect(mapStateToProps)(Header);
