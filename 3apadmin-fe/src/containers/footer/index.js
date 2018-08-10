// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/3ap_logo.svg';
import './footer.css';

type Props = {
  location: Location
};

class Footer extends Component<Props> {
  render() {
    const { pathname } = this.props.location;
    const LOGIN_PATH = '/login';
    //hide header on login page
    if (pathname !== LOGIN_PATH) {
      return (
        <div className="footer">
          <Link to="/">
            <img src={logo} alt="3ap logo" className="footer-logo-3ap" />
          </Link>
          <div className="credits">
            <FormattedMessage id="footer.copyright" />{' '}
            {new Date().getFullYear()}
          </div>
        </div>
      );
    }
    return null;
  }
}

export default withRouter(Footer);
