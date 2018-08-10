// @flow
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Menu from '@material-ui/core/Menu/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuVertIcon from '@material-ui/icons/Menu';

import '../header.css';

const menuList = [
  {
    name: <FormattedMessage id="main-menu.time" />,
    route: '/time',
    id: 'menu-time'
  },
  {
    name: <FormattedMessage id="main-menu.profile" />,
    route: '/profile',
    id: 'menu-profile'
  },
  {
    name: <FormattedMessage id="main-menu.projects" />,
    route: '/projects',
    id: 'menu-projects'
  },
  {
    name: <FormattedMessage id="main-menu.swisscard_upload" />,
    route: '/swisscard_upload',
    id: 'menu-swisscard_upload'
  },
  {
    name: <FormattedMessage id="main-menu.about-us" />,
    route: '/about-us',
    id: 'menu-about-us'
  },
  {
    name: <FormattedMessage id="main-menu.team" />,
    route: '/team',
    id: 'menu-team'
  }
];

type Props = {};
type State = {
  anchorEl: ?EventTarget
};

class MenuComponent extends Component<Props, State> {
  state = {
    anchorEl: null
  };

  handleClick = (event: Event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <nav>
        <div className="main-menu">
          {menuList.map(({ route, name, id }, i) => {
            return (
              <Link key={i} to={route} data-testid={id}>
                {name}
              </Link>
            );
          })}
        </div>

        <div className="drop-menu">
          <IconButton
            aria-owns={anchorEl ? 'long-menu' : null}
            onClick={this.handleClick}
            style={{ color: 'white' }}
          >
            <MenuVertIcon />
          </IconButton>
        </div>

        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          style={{ marginTop: 50 }}
        >
          {menuList.map(({ route, name, id }, key) => (
            <MenuItem key={key} onClick={this.handleClose}>
              <Link
                style={{ textDecoration: 'none' }}
                to={route}
                data-testid={id}
              >
                {name}
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </nav>
    );
  }
}

export default MenuComponent;
