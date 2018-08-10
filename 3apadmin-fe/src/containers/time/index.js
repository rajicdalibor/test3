// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
  fetchHarvestUser,
  fetchHarvestUsers
} from '../../actions/3apadmin/time';
import Users from '../../components/users';
import { isHarvestUserAdmin } from '../../reducers';

type Props = {
  users: Array<HarvestUser>,
  isFetching: boolean,
  dispatch: Dispatch,
  usersMeData: HarvestUser,
  userMe: HarvestUser,
  fetchUser: Function,
  redirectToOvertime: Function,
  fetchUsers: Function,
  isAdmin: boolean
};

class Time extends Component<Props> {
  componentWillMount() {
    const { fetchUser } = this.props;
    fetchUser();
  }

  componentWillReceiveProps(nextProps) {
    const { redirectToOvertime, fetchUsers } = this.props;
    if (nextProps.userMe !== this.props.userMe) {
      if (nextProps.isAdmin) {
        fetchUsers();
      } else {
        redirectToOvertime(nextProps.userMe.id);
      }
    }
  }

  render() {
    const { users, isFetching } = this.props;
    if (users) {
      return (
        <div>
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Users users={users} />
          </div>
        </div>
      );
    } else {
      return <div>{isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>}</div>;
    }
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchHarvestUser()),
  fetchUsers: () => dispatch(fetchHarvestUsers()),
  redirectToOvertime: id => dispatch(push(`/overtime/${id}`))
});

const mapStateToProps = (state: State) => {
  const { users, usersMe } = state;

  return {
    userMe: usersMe.usersMeData,
    isFetching: usersMe.isFetching || users.isFetching,
    users: users.userData,
    isAdmin: isHarvestUserAdmin(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Time);
