import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import ReactLoader from 'react-loader-component';
import { fetchAAAPUser } from '../../actions/3apadmin/api';
import Loader from '../../components/loader';

type Props = {
  aaapuser: User
};

export class UserData extends Component<Props> {
  render() {
    const { aaapuser } = this.props;
    return (
      <div>
        <div>
          <FormattedMessage id={'userprofile.email'} /> {aaapuser.email}
        </div>
        <div>
          <FormattedMessage id={'userprofile.phone'} /> {aaapuser.telephone}
        </div>
        <div>
          <FormattedMessage id={'userprofile.skype'} /> {aaapuser.skype}
        </div>
        <div>
          <FormattedMessage id={'userprofile.birthday'} /> {aaapuser.birthday}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  const { aaapuser, usersMe } = state;

  return {
    aaapuser: aaapuser.aaapuserData,
    loaded: usersMe.loaded
  };
};

const mapDispatchToProps = dispatch => ({
  fetchAAAPUser: () => dispatch(fetchAAAPUser())
});

const WrappedTime = ReactLoader({
  component: UserData,
  errorComponent: props => <div>An error occured</div>,
  loadingComponent: props => <div> !!!!!! Loading... !!!!!!! </div>,
  isLoaded: props => props => (
      <div>
          <Loader />
      </div>
  ),
  isError: props => props.error
});

export default connect(mapStateToProps, mapDispatchToProps)(WrappedTime);
