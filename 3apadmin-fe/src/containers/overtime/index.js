// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOvertime, invalidateOvertime } from '../../actions/3apadmin/time';
import moment from 'moment';
import TimeCardPanel from '../../components/timecard';
import { isHarvestUserAdmin } from '../../reducers';
import { getTotalOvertime } from '../../reducers';
import SnackbarMessage from '../../components/snackbar';

type Props = {
  overtime: OvertimeType,
  totalOvertime: OvertimeType,
  isFetching: boolean,
  dispatch: Dispatch,
  fetchOvertime: Function,
  invalidateOvertime: Function,
  match: Match,
  aaapuser: User,
  isAdmin: boolean
};

type state = {
  open: boolean,
  initialOpen: boolean
};

class Overtime extends Component<Props, state> {
  state = {
    open: false,
    initialOpen: false
  };

  openSnackbar = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  componentWillMount() {
    const { invalidateOvertime } = this.props;
    invalidateOvertime();
  }

  componentDidMount() {
    const { match, fetchOvertime } = this.props;
    fetchOvertime(match.params.userId);
  }

  checkForMissingStartDate(overtime) {
    return overtime && overtime.harvestUserId && !overtime.startDate;
  }

  componentDidUpdate() {
    const { overtime } = this.props;

    if (
      this.state.open === false &&
      this.state.initialOpen === false &&
      this.checkForMissingStartDate(overtime)
    ) {
      this.openSnackbar();
      this.setState({ initialOpen: true });
    }
  }

  render() {
    const { totalOvertime, overtime, isFetching } = this.props;
    const isEmpty =
      !overtime ||
      !overtime.harvestUserId ||
      this.checkForMissingStartDate(overtime);

    return (
      <div>
        <SnackbarMessage
          state={this.state.open}
          closeFn={this.handleClose}
          message={'Unable to calculate overtime'}
        />

        {isEmpty ? (
          isFetching ? (
            <h2>Loading...</h2>
          ) : (
            <div>
              <h2>Empty.</h2>
            </div>
          )
        ) : (
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <h1>
              {overtime.firstName} {overtime.lastName}
            </h1>
            <p>
              {' '}
              Disclaimer: paid out overtime and changes in percentage of
              employment (e.g went from 100% to 80%) are not yet taken into
              account
            </p>
            <h3> From: {overtime.startDate} </h3>
            {/* target is computed until yesterday*/}
            <h3>
              {' '}
              To:{' '}
              {moment()
                .add(-1, 'days')
                .format('YYYY-MM-DD')}{' '}
            </h3>
            <TimeCardPanel
              totalOvertime={totalOvertime}
              loggedTimes={overtime.loggedTimesYearMonth}
              userPhoto={this.props.aaapuser.picture}
              fullname={this.props.aaapuser.name}
              isAdmin={this.props.isAdmin}
              isActive={true}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  const { overtime, aaapuser } = state;
  const isFetching = overtime.isFetching;

  return {
    totalOvertime: getTotalOvertime(state),
    overtime: overtime.overtimeData,
    aaapuser: aaapuser.aaapuserData,
    isAdmin: isHarvestUserAdmin(state),
    isFetching
  };
};
const mapDispatchToProps = dispatch => ({
  invalidateOvertime: () => dispatch(invalidateOvertime()),
  fetchOvertime: id => dispatch(fetchOvertime(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Overtime);
