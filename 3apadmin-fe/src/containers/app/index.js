// @flow
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Header from '../header';
import Footer from '../footer';
import Login from '../login';
import { fetchAAAPUser } from '../../actions/3apadmin/api';
import Routes from '../routes';

import intlMessagesEn from '../../i18n/en.json';

const theme = createMuiTheme({
  palette: {
    default: '#5a5a5a',
    lightGreen: '#70c16b',
    darkGreen: '#00a39b',
    green: '#24a47f',
    borderGreen: '#009990'
  },
  overrides: {
    MuiFormLabel: {
      root: {
        color: '#5a5a5a'
      },
      focused: {
        color: '#5a5a5a !important'
      }
    },
    MuiInput: {
      input: {
        color: '#fff'
      }
    }
  }
});

let i18nConfig = {
  locale: 'en',
  messages: intlMessagesEn
};

type Props = {
  aaapuser: User,
  dispatch: Dispatch,
  fetchAAAPUser: Function
};

class App extends Component<Props> {
  componentDidMount() {
    const { fetchAAAPUser } = this.props;
    fetchAAAPUser();
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <IntlProvider
          key={i18nConfig.locale}
          locale={i18nConfig.locale}
          messages={i18nConfig.messages}
        >
          <div className="wrapper">
            <Route exact path="/login" component={Login} />
            <Header className="header" />
            <Routes />
            <Footer />
          </div>
        </IntlProvider>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state: State) => {
  const { aaapuser } = state;
  return {
    aaapuser: aaapuser.aaapuserData
  };
};
const mapDispatchToProps = dispatch => ({
  fetchAAAPUser: () => dispatch(fetchAAAPUser())
});

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default withRouter(AppContainer);
