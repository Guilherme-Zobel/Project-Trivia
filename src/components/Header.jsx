import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

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
      <header>
        <img data-testid="header-profile-picture" src={ imageApi } alt="imagem" />
        <p data-testid="header-player-name">{name}</p>
        <div data-testid="header-score">
          Score:
          {score}
        </div>
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
