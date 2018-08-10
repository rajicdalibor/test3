import { apiFetch } from '../helper';
import { call, put, select } from 'redux-saga/effects';
import {
  fetchHarvestUser,
  fetchHarvestUsers,
  fetchOvertime
} from './time.saga';
import {
  fetchHarvestUsersSuccess,
  fetchHarvestUserSuccess,
  fetchHarvestUserFail,
  fetchHarvestUsersFail,
  fetchOvertimeSuccess,
  fetchOvertimeFail
} from '../actions/3apadmin/time';
import {
  isHarvestUsersLoaded,
  isHarvestUserLoaded,
  isOvertimesLoaded
} from '../reducers/index';

describe('Harvest user saga', () => {
  it('should not fetch harvest user data if user data is already present', () => {
    const hasHarvestUserData = true;
    const gen = fetchHarvestUser();

    expect(gen.next().value).toEqual(select(isHarvestUserLoaded));
    expect(gen.next(hasHarvestUserData).done).toBeTruthy();
  });

  it('should fetch and put harvest user data', () => {
    const user = {
      name: 'Jean Luc'
    };
    const gen = fetchHarvestUser();
    expect(gen.next().value).toEqual(select(isHarvestUserLoaded));
    expect(gen.next().value).toEqual(call(apiFetch, '/time/users/me'));
    expect(gen.next(user).value).toEqual(put(fetchHarvestUserSuccess(user)));
    expect(gen.next().done).toBeTruthy();
  });

  it('should fetch and put error on harvest user data failure', () => {
    const error = new Error('api error');
    const gen = fetchHarvestUser();
    expect(gen.next().value).toEqual(select(isHarvestUserLoaded));
    expect(gen.next().value).toEqual(call(apiFetch, '/time/users/me'));
    expect(gen.throw(error).value).toEqual(put(fetchHarvestUserFail(error)));
    expect(gen.next().done).toBeTruthy();
  });
});
describe('Harvest users saga', () => {
  it('should not fetch harvest users data if data is already present', () => {
    const hasHarvestUsers = true;
    const gen = fetchHarvestUsers();

    expect(gen.next().value).toEqual(select(isHarvestUsersLoaded));
    expect(gen.next(hasHarvestUsers).done).toBeTruthy();
  });

  it('should fetch and put harvest users data', () => {
    const user = {
      name: 'Jean Luc'
    };
    const gen = fetchHarvestUsers();

    expect(gen.next().value).toEqual(select(isHarvestUsersLoaded));
    expect(gen.next().value).toEqual(call(apiFetch, '/time/users'));
    expect(gen.next(user).value).toEqual(put(fetchHarvestUsersSuccess(user)));
    expect(gen.next().done).toBeTruthy();
  });

  it('should fetch and put error on harvest users data failure', () => {
    const error = new Error('api error');
    const gen = fetchHarvestUsers();

    expect(gen.next().value).toEqual(select(isHarvestUsersLoaded));
    expect(gen.next().value).toEqual(call(apiFetch, '/time/users'));
    expect(gen.throw(error).value).toEqual(put(fetchHarvestUsersFail(error)));
    expect(gen.next().done).toBeTruthy();
  });
});
describe('Harvest overtime saga', () => {
  it('should not fetch overtime data if data is already present', () => {
    const id = 1;
    const hasOvertimeData = true;
    const action = { payload: id };
    const gen = fetchOvertime(action);

    expect(gen.next().value).toEqual(select(isOvertimesLoaded));
    expect(gen.next(hasOvertimeData).done).toBeTruthy();
  });

  it('should fetch and put overtime', () => {
    const id = 1;
    const hasOvertimeData = false;
    const action = { payload: id };
    const gen = fetchOvertime(action);

    expect(gen.next().value).toEqual(select(isOvertimesLoaded));
    expect(gen.next(hasOvertimeData).value).toEqual(
      call(apiFetch, `/time/overtime/${id}`)
    );
    expect(gen.next(id).value).toEqual(put(fetchOvertimeSuccess(id)));
    expect(gen.next().done).toBeTruthy();
  });

  it('should fetch and put error on overtime failure', () => {
    const id = 1;
    const hasOvertimeData = false;
    const action = { payload: id };
    const error = new Error('api error');
    const gen = fetchOvertime(action);

    expect(gen.next().value).toEqual(select(isOvertimesLoaded));
    expect(gen.next(hasOvertimeData).value).toEqual(
      call(apiFetch, `/time/overtime/${id}`)
    );
    expect(gen.throw(error).value).toEqual(put(fetchOvertimeFail(error)));
    expect(gen.next().done).toBeTruthy();
  });
});
