import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      score: 0,
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
    // this.setState({ imageApi: image });
    // return image;
  }

  render() {
    const { name } = this.props;
    const { imageApi, score } = this.state;
    return (
      <header>
        <img data-testid="header-profile-picture" src={ imageApi } alt="imagem" />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
});

export default connect(mapStateToProps)(Header);
