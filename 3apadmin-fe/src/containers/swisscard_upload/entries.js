// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

type Props = {
  dispatch: Dispatch,
  entries: Array<any>,
  title: string,
  children?: React$Element<any>
};

class TimeEntries extends Component<Props> {
  render() {
    console.log(this.props);
    if (this.props.entries.length > 0) {
      return (
        <div>
          {this.props.title}
          {this.props.entries.map((entry, index) => {
            return (
              <div key={index}>
                {' '}
                Entry: {entry.hours} Date: {entry.spentDate} ProjectId:{' '}
                {entry.projectId} TaskId: {entry.taskId}
              </div>
            );
          })}
          {this.props.children}
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state: State) => {
  return {};
};

export default connect(mapStateToProps)(TimeEntries);
