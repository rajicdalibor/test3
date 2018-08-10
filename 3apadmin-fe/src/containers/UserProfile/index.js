// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAAAPUser } from '../../actions/3apadmin/api';
import {
  fetchOvertime,
  invalidateOvertime,
  // fetchProject,
  fetchHarvestUser
} from '../../actions/3apadmin/time';
import './profile.css';
import { getTotalOvertime } from '../../reducers';
import TimeCardPanel from '../../components/timecard';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import iconMarker from '../../icons/pinoval.png';
import ProjectWidget from '../../components/projectWidget';
import ReactLoader from 'react-loader-component';
import Skills from '../../components/skills';
import UserData from '../../components/userData';
import Loader from '../../components/loader';
import Error from '../../components/error';
import Calendar from '../../components/calendar';

type Props = {
  aaapuser: User,
  dispatch: Dispatch,
  usersMeData: HarvestUser,
  projectsMe: HarvestProject,
  project: Array<HarvestProject>,
  totalOvertime: number,
  invalidateOvertime: Function,
  overtime: OvertimeType,
  match: Match,
  fetchOvertime: Function,
  fetchAAAPUser: Function,
  isFetchingOvertime: boolean,
  center: any,
  zoom: number,
  loaded: boolean
};

class UserProfile extends Component<Props> {
  static propTypes = {
    overtime: PropTypes.object.isRequired,
    isFetchingOvertime: PropTypes.bool.isRequired,
    dispatch: PropTypes.func
  };

  static defaultProps = {
    center: { lat: 44.816333, lng: 20.437008 },
    zoom: 15
  };

  componentWillMount() {
    const { invalidateOvertime } = this.props;
    invalidateOvertime();
  }

  componentDidMount() {
    const { fetchOvertime } = this.props;
    // fetchOvertime(match.params.userId);
    fetchOvertime(this.props.usersMeData.id);
    // fetchProject();
  }

  renderMarkers(map, maps) {
    let marker = new maps.Marker({
      position: { lat: 44.816333, lng: 20.437008 },
      icon: iconMarker,
      map
    });

    let content =
      '<div class="info-window">' +
      '<div>Work in Belgrade, Serbia</div>' +
      '<div><img alt="home" src="../../icons/home-button.png" style="vertical-align:middle">' +
      'Usce bussiness centar</div>' +
      '<div><img alt="location" src="../../icons/maps-and-flags.png" style="vertical-align:middle">' +
      'Bulevar Mihajla Pupina 6, Beograd</div>' +
      '<div><img alt="clock" src="../../icons/clock-circular-outline.png" style="vertical-align:middle">' +
      'Works Monday-Friday</div></div>';
    let infowindow = new maps.InfoWindow({
      content: content
      //maxWidth: 350
    });
    infowindow.open(map, marker);
  }

  render() {
    const { aaapuser, overtime, totalOvertime, project } = this.props;
    return (
      <div className="grid-container">
        <div className="box1">
          <img alt="profile-img" className="img-style" src={aaapuser.picture} />
        </div>
        <div className="box2">
          <div className="text">
            <h2>{aaapuser.name}</h2>
          </div>
          <div className="position">Position</div>
        </div>
        <div className="box3">
          <Calendar />
        </div>
        <div className="box4">
          <Skills />
        </div>
        <div className="box5">
          <div className="box5-1">
            <UserData />
          </div>
          <div className="box5-2">
            <TimeCardPanel
              totalOvertime={totalOvertime}
              loggedTimes={overtime.loggedTimesYearMonth}
            />
          </div>
        </div>
        <div className="box6">
          <ProjectWidget project={project} />
        </div>
        <div className="box7">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyA_odCcoMTLLFEGzpjxJFuhbcd1loi_KNc'
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
            yesIWantToUseGoogleMapApiInternals={true}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  const { aaapuser, usersMe, overtime, project } = state;
  const isFetching = overtime.isFetching;
  const isFetchingOvertime = overtime.isFetching;

  return {
    aaapuser: aaapuser.aaapuserData,
    project: project.projectsMe,
    usersMeData: usersMe.usersMeData,
    totalOvertime: getTotalOvertime(state),
    overtime: overtime.overtimeData,
    isFetching,
    isFetchingOvertime,
    loaded: usersMe.loaded
  };
};

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchHarvestUser()),
  invalidateOvertime: () => dispatch(invalidateOvertime()),
  fetchOvertime: id => dispatch(fetchOvertime(id)),
  fetchAAAPUser: () => dispatch(fetchAAAPUser())
  // fetchProject: () => dispatch(fetchProject())
});

const WrappedTime = ReactLoader({
  component: UserProfile,
  errorComponent: props => (
    <div>
      <Error />
    </div>
  ),
  loadingComponent: props => (
    <div>
      <Loader />
    </div>
  ),
  componentWillMount: props => {
    const { fetchUser, invalidateOvertime } = props;
    invalidateOvertime();
    fetchUser();
  },
  isLoaded: props => props.loaded,
  isError: props => props.error
});

export default connect(mapStateToProps, mapDispatchToProps)(WrappedTime);
