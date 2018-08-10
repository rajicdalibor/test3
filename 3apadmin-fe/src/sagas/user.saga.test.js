import { apiFetch } from '../helper';
import { call, put, select } from 'redux-saga/effects';
import { fetchUser, logoutUser } from './user.saga';
import {
  fetchAAAPUserSuccess,
  fetchAAAPUserFail
} from '../actions/3apadmin/api';
import { isAaaapUserLoaded } from '../reducers/index';

describe('User saga', () => {
  it('should not fetch user if user is already present or fetching', () => {
    const hasCurrentUser = true;
    const gen = fetchUser();

    expect(gen.next().value).toEqual(select(isAaaapUserLoaded));
    expect(gen.next(hasCurrentUser).done).toBeTruthy();
  });

  it('should fetch and put user info', () => {
    const user = {
      name: 'Jean Luc'
    };
    const gen = fetchUser();

    expect(gen.next().value).toEqual(select(isAaaapUserLoaded));
    expect(gen.next().value).toEqual(call(apiFetch, '/userinfo'));
    expect(gen.next(user).value).toEqual(put(fetchAAAPUserSuccess(user)));
    expect(gen.next().done).toBeTruthy();
  });

  it('should fetch and put error on user info failure', () => {
    const error = new Error('api error');
    const gen = fetchUser();

    expect(gen.next().value).toEqual(select(isAaaapUserLoaded));
    expect(gen.next().value).toEqual(call(apiFetch, '/userinfo'));
    expect(gen.throw(error).value).toEqual(put(fetchAAAPUserFail(error)));
    expect(gen.next().done).toBeTruthy();
  });
});

describe('Logout saga', () => {
  it('should logout user', () => {
    const gen = logoutUser();
    expect(gen.next().value).toEqual(
      call(apiFetch, '/logout', { method: 'POST' })
    );
    expect(gen.next().done).toBeTruthy();
  });
});
