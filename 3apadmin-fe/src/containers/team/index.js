// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import fakeUsersData from './users';
import {
  FormControl,
  InputLabel,
  InputAdornment,
  Input,
  Grid
} from '@material-ui/core';

import Search from '@material-ui/icons/Search';
import TimeCardPanel from '../../components/timecard/index';
import { isHarvestUserAdmin } from '../../reducers';

import './team.css';

type FlowProps = {
  users: Array<HarvestUser>
};

type FlowState = {
  users: Array<HarvestUser>
};

class Team extends Component<FlowProps, FlowState> {
  constructor(props: FlowProps) {
    super(props);

    this.state = {
      users: fakeUsersData.users
    };
  }

  searchEmploye(e: Object) {
    const userEntry = e.target.value.toLowerCase();
    const users = fakeUsersData.users;
    if (userEntry.length < 1) {
      this.setState({
        users: fakeUsersData.users
      });
      return;
    }
    const newUsersList = users.filter(function(obj) {
      return (
        obj.firstName.toLowerCase().indexOf(userEntry) > -1 ||
        obj.lastName.toLowerCase().indexOf(userEntry) > -1
      );
    });

    this.setState({
      users: newUsersList
    });
  }

  render() {
    const users = this.state.users;
    if (fakeUsersData.users) {
      return (
        <div>
          <h1>Team</h1>
          <Grid container justify="center">
            <Grid item md={5} xs={12}>
              <FormControl fullWidth={true}>
                <InputLabel align="center" htmlFor="search-employe-label">
                  Search Employee
                </InputLabel>
                <Input
                  onChange={this.searchEmploye.bind(this)}
                  id="input-employe"
                  endAdornment={
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <div className="users">
            {users.map(user => (
              <TimeCardPanel
                key={user.id}
                totalOvertime={user.overtime}
                loggedTimes={0}
                isActive={user.is_active}
                userPhoto={user.avatarUrl}
                fullname={user.firstName + ' ' + user.lastName}
              />
            ))}
          </div>
        </div>
      );
    }
    return (
      <div>
        <h1>Team</h1>
        <p>Users not exists</p>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    isAdmin: isHarvestUserAdmin(state)
  };
};

export default connect(mapStateToProps)(Team);
