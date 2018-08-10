import { apiFetch } from '../helper';
import { put, call, select } from 'redux-saga/effects';
import {
  fetchAAAPUserFail,
  fetchAAAPUserSuccess
} from '../actions/3apadmin/api';
import { isAaaapUserLoaded } from '../reducers/index';

export function* fetchUser() {
  try {
    const hasUser = yield select(isAaaapUserLoaded);
    if (hasUser) {
      return;
    }
    const user = yield call(apiFetch, '/userinfo');
    yield put(fetchAAAPUserSuccess(user));
  } catch (e) {
    yield put(fetchAAAPUserFail(e));
  }
}

export function* logoutUser() {
  yield call(apiFetch, '/logout', { method: 'POST' });
}
