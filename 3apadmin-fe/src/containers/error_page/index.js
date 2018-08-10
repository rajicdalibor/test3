// @flow
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import './error_page.css';

import errors from './errors';
import error_icon from '../../assets/images/error icon.svg';

type Props = {
  error_code: String
};
type State = {
  error: Object
};

class ErrorPage extends Component<Props, State> {
  constructor(props: { error_code: String }) {
    super(props);

    const { error_code } = this.props;
    this.state = {
      error: errors[error_code] ? errors[error_code] : errors[404] // set error (use 404 as default)
    };
  }

  render() {
    const { error } = this.state;

    return (
      <div className="error-page">
        <div className="error-title">
          <FormattedMessage id={error.title} />
        </div>
        <div className="error-id">{error.id}</div>
        <div className="error-description">
          <FormattedMessage id={error.description} />
        </div>
        <img src={error_icon} alt="error icon" className="error-icon" />
      </div>
    );
  }
}

export default ErrorPage;
