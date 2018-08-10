// @flow
import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Time from '../time';
import Team from '../team';
import About from '../about';
import SwisscardUpload from '../swisscard_upload';
import Overtime from '../overtime';
import Home from '../home';
import ErrorPage from '../error_page';
import UserProfile from '../UserProfile';
import Projects from '../projects';

type Props = {
  aaapuser: User,
  location: Location
};

const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: '/login'
          }}
        />
      )
    }
  />
);

class Routes extends Component<Props> {
  render() {
    const { match, aaapuser } = this.props;
    const { pathname } = this.props.location;
    const LOGIN_PATH = '/login';
    if (pathname !== LOGIN_PATH) {
        console.log('RUTA');
        console.log({match});
      return (
        <main className="main">
          <Switch>
            <PrivateRoute exact path="/" component={Home} user={aaapuser} />
            <PrivateRoute
              exact
              path="/profile"
              component={UserProfile}
              user={aaapuser}
            />
            <Route exact path="/about-us" component={About} />
            <PrivateRoute exact path="/time" component={Time} user={aaapuser} />
            <PrivateRoute
              exact
              path="/projects"
              component={Projects}
              user={aaapuser}
            />
            <PrivateRoute exact path="/team" component={Team} user={aaapuser} />
            <Route exact path="/swisscard_upload" component={SwisscardUpload} />
            <Route path="/overtime/:userId" component={Overtime} />
            {/* <Route path="/UserProfile/:userId" component={UserProfile} /> */}
            <Route component={ErrorPage} />
          </Switch>
        </main>
      );
    }
    return null;
  }
}

const mapStateToProps = (state: State) => {
  const { aaapuser } = state;
  return {
    aaapuser: aaapuser.aaapuserData
  };
};

export default withRouter(connect(mapStateToProps)(Routes));
