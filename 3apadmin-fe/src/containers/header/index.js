// @flow
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import MenuComponent from './menu';
import HeaderUserData from './headeruserdata';

import './header.css';
import logo from '../../assets/images/3ap_logo.svg';

type Props = {
  location: Location
};

class Header extends Component<Props> {
  render() {
    const { pathname } = this.props.location;
    const LOGIN_PATH = '/login';
    //hide header on login page
    if (pathname !== LOGIN_PATH) {
      return (
        <header className="header">
          <Link to="/">
            <img src={logo} alt="3ap logo" />
          </Link>

          <MenuComponent />

          <HeaderUserData />
        </header>
      );
    }
    return null;
  }
}

export default withRouter(Header);
