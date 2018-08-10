import {
  fetchHarvestUserSuccess,
  fetchHarvestUserFail,
  fetchHarvestUsersSuccess,
  fetchHarvestUsersFail,
  fetchOvertimeSuccess,
  fetchOvertimeFail,
  fetchProjectSuccess,
  fetchProjectFail
} from '../actions/3apadmin/time';
import { apiFetch } from '../helper';
import { call, put, select } from 'redux-saga/effects';
import {
  isHarvestUserLoaded,
  isHarvestUsersLoaded,
  isOvertimesLoaded,
  isHarvestProjectLoaded
} from '../reducers/index';

export function* fetchHarvestUser() {
  try {
    const hasHarvestUser = yield select(isHarvestUserLoaded);
    if (hasHarvestUser) {
      return;
    }
    const user = yield call(apiFetch, '/time/users/me');
    yield put(fetchHarvestUserSuccess(user));
  } catch (e) {
    yield put(fetchHarvestUserFail(e));
  }
}

export function* fetchHarvestUsers() {
  try {
    const hasHarvestUsers = yield select(isHarvestUsersLoaded);
    if (hasHarvestUsers) {
      return;
    }
    const users = yield call(apiFetch, '/time/users');
    yield put(fetchHarvestUsersSuccess(users));
  } catch (e) {
    yield put(fetchHarvestUsersFail(e));
  }
}

export function* fetchOvertime({ payload: userId }) {
  try {
    const hasOvertimes = yield select(isOvertimesLoaded);
    if (hasOvertimes) {
      return;
    }
    const data = yield call(apiFetch, `/time/overtime/${userId}`);
    data
      ? yield put(fetchOvertimeSuccess(data))
      : yield put(fetchOvertimeFail());
  } catch (e) {
    yield put(fetchOvertimeFail(e));
  }
}

export function* fetchProject() {
  try {
    const hasHarvestProject = yield select(isHarvestProjectLoaded);
    if (hasHarvestProject) {
      return;
    }
    const projects = yield call(apiFetch, '/time/projects/me');
    yield put(fetchProjectSuccess(projects));
  } catch (e) {
    console.log(e);
    yield put(fetchProjectFail(e));
  }
}
