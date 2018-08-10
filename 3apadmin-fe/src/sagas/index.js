import { takeLeading, takeEvery } from 'redux-saga/effects';
import { FETCH_AAAP_USER, LOGOUT_AAAP_USER } from '../actions/3apadmin/api';
import { fetchUser, logoutUser } from './user.saga';
import {
  fetchHarvestUser,
  fetchHarvestUsers,
  fetchOvertime,
  fetchProject
} from './time.saga';
import {
  FETCH_HARVEST_USER,
  FETCH_HARVEST_USERS,
  FETCH_OVERTIME,
  FETCH_PROJECT
} from '../actions/3apadmin/time';

function* saga() {
  yield takeEvery(FETCH_AAAP_USER, fetchUser);
  yield takeLeading(LOGOUT_AAAP_USER, logoutUser);
  yield takeLeading(FETCH_HARVEST_USER, fetchHarvestUser);
  yield takeLeading(FETCH_HARVEST_USERS, fetchHarvestUsers);
  yield takeLeading(FETCH_OVERTIME, fetchOvertime);
  yield takeLeading(FETCH_PROJECT, fetchProject);
}

export default saga;
