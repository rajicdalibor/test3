// @flow
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import './login.css';

type Props = {
  aaapuser: User,
  location: Location
};

class Login extends Component<Props> {
  loginWithGoogle = () => {
    const backendDomain =
      process.env.REACT_APP_BACKEND_DOMAIN || 'localhost:8080';
    window.location =
      'http://' + backendDomain + '/oauth2/authorization/google';
  };

  render() {
    const { aaapuser } = this.props;

    // if there is aaapuser check for location.state.from property
    // which is set during redirection to login from privateRoute
    // if dont exists - redirect to home
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (aaapuser) {
      return <Redirect to={from} />;
    }

    return (
      <div className="login-wrapper">
        <div className="login-google">
          <div className="login-container">
            <div className="logo" />
            <div className="login-title">
              <FormattedMessage id="login.login-title" />
            </div>
            <div className="login-message">
              <FormattedMessage id="login.login-message" />
            </div>
            <button
              data-testid="login-button"
              className="login-button"
              onClick={this.loginWithGoogle}
            >
              <div className="button-title">
                <div className="google-icon" />
                <FormattedMessage id="login.button-title" />
              </div>
            </button>
          </div>
        </div>
        <div className="login-background">
          <div className="mountain" />
          <h1 className="moto-title">
            <FormattedMessage id="login.moto-title" />
          </h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { aaapuser } = state;
  return {
    aaapuser: aaapuser.aaapuserData
  };
};

export default connect(mapStateToProps)(Login);
