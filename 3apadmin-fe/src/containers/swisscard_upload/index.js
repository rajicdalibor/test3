// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FileUpload from './file_upload';

type Props = {
  dispatch: Dispatch
};

class SwisscardUpload extends Component<Props> {
  render() {
    return (
      <div>
        <h1>Swisscard Report Upload</h1>
        <FileUpload />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {};
};

export default connect(mapStateToProps)(SwisscardUpload);
