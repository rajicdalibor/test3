// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './timecard.css';
import MonthEntry from '../monthEntry/index';

type Props = {
  totalOvertime: number,
  loggedTimes: Object,
  userPhoto: string,
  fullname: string,
  classes: Object,
  isAdmin: boolean,
  isActive: boolean
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const styles = theme => ({});

let timeCardColor = {
  backgroundColor: '#00a39b'
};

let profileImageCard = 'profile-image-card';

let timeCardContainer = 'time-card-container';

class TimeCardPanel extends Component<Props> {
  showOvertime() {
    const id_str = 'timecard.overtime';
    const val = this.props.totalOvertime;
    return (
      <div>
        <FormattedMessage id={id_str} /> <br />
        <span className="hours">
          {val} <FormattedMessage id="timecard.hours" />
        </span>
      </div>
    );
  }

  getMonthAndYear() {
    return Object.keys(this.props.loggedTimes)
      .sort()
      .reverse()
      .map((loggedTime, i) => (
        <div key={i}>
          {loggedTime.substring(0, 4)} {months[+loggedTime.split('-')[1] - 1]}
        </div>
      ));
  }

  getActualAndTargetTime() {
    return Object.keys(this.props.loggedTimes)
      .sort()
      .reverse()
      .map((loggedTime, i) => (
        <div key={i}>
          <MonthEntry monthEntry={this.props.loggedTimes[loggedTime]} />
        </div>
      ));
  }

  showOrHideUserPhoto() {
    if (this.props.userPhoto) {
      timeCardContainer = 'time-card-container';
      profileImageCard = 'profile-image-card';
    } else {
      timeCardContainer = 'time-card-container1';
      profileImageCard = 'profile-image-card1';
    }
  }

  setTimeCardBackground() {
    // setting time card background color based on over/under time hours
    if (this.props.totalOvertime > 50 || this.props.totalOvertime < -50) {
      timeCardColor = {
        backgroundColor: '#E37635'
      };
    } else if (
      this.props.totalOvertime > 20 ||
      this.props.totalOvertime < -20
    ) {
      timeCardColor = {
        backgroundColor: '#FFD984'
      };
    } else {
      timeCardColor = {
        backgroundColor: '#00a39b'
      };
    }
  }

  render() {
    //time card on 'team' page will contain user photo, while it won't contain user photo on 'profile' page
    this.showOrHideUserPhoto();

    //set background color based on over/undertime
    this.setTimeCardBackground();

    //TODO  depend on user role display time data or not
    /*
            if (this.props.isAdmin) {
        */

    if (this.props.loggedTimes) {
      return (
        <div className="root">
          <ExpansionPanel disabled={!this.props.isActive}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              className={this.props.classes.panel}
              style={timeCardColor}
            >
              <div className={timeCardContainer} style={timeCardColor}>
                <div>
                  <img
                    className={profileImageCard}
                    src={this.props.userPhoto}
                    alt="user profile"
                  />
                </div>
                <div className="user-time">
                  {this.showOvertime()}
                  {this.props.fullname}
                </div>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={this.props.classes.detailedPanel}>
              <div className="details" style={timeCardColor}>
                <div className="text">
                  <div>{this.getMonthAndYear()}</div>
                </div>
                <div className="hours">
                  <div>{this.getActualAndTargetTime()}</div>
                </div>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      );
    } else {
      return <h1>Test</h1>;
    }

    /*    } else {
      return (
        <div className="root">
          <div className={this.props.classes.panel}>
            <div className="container">
              <div>
                <img
                  className="profile-image-card"
                  src={this.props.userPhoto}
                  alt="user profile"
                />
              </div>
              <div className="user-time">
                {this.props.fullname}
                <div className="hours">Position</div>
              </div>
            </div>
          </div>
        </div>
      );
    }*/
  }
}

export default withStyles(styles)(TimeCardPanel);
