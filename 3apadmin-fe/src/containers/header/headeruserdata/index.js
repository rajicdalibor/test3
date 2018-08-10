// @flow
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { logoutAAAPUser } from '../../../actions/3apadmin/api';
import { IconButton } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';

import '../header.css';

type Props = {
  aaapuser: User,
  user: User,
  logoutUser: Function
};
type State = {
  anchorEl: ?EventTarget
};

class HeaderUserData extends Component<Props, State> {
  user: User;
  logoutUser: Function;

  constructor(props: Props) {
    super();
    this.logoutUser = props.logoutUser;

    this.state = {
      anchorEl: null
    };
  }

  handleClick = (event: Event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    if (this.props.aaapuser) {
      const user = this.props.aaapuser;
      const { anchorEl } = this.state;
      return (
        <div>
          <div className="profile-name">
            {user.name}
            <br />
            {user.email}
          </div>
          <div className="profile-icon">
            <IconButton
              data-testid="icon-dropdown"
              aria-owns={anchorEl ? 'icon-dropdown' : null}
              onClick={this.handleClick}
              style={{ color: 'white', width: '60px', height: '60px' }}
            >
              <img
                className="profile-image"
                alt="3ap user"
                src={user.picture}
              />
            </IconButton>
          </div>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
            style={{ marginTop: 70 }}
          >
            <MenuItem onClick={this.handleClose} data-testid="icon-logout">
              <Link
                style={{ textDecoration: 'none' }}
                to="/"
                onClick={() => this.logoutUser()}
              >
                <FormattedMessage id="logout.button-title" />
              </Link>
            </MenuItem>
          </Menu>
        </div>
      );
    }
    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutAAAPUser())
});

const mapStateToProps = state => {
  const { aaapuser } = state;
  return {
    aaapuser: aaapuser.aaapuserData
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderUserData);
