import {
  FETCH_HARVEST_USER,
  FETCH_HARVEST_USER_SUCCESS,
  FETCH_HARVEST_USERS,
  FETCH_HARVEST_USERS_SUCCESS,
  FETCH_OVERTIME,
  FETCH_OVERTIME_SUCCESS,
  INVALIDATE_OVERTIME,
  fetchOvertimeSuccess
} from '../actions/3apadmin/time';
import { usersMe, overtime } from './3apadmintime';

describe('UsersMe', () => {
  it('has a default state', () => {
    expect(usersMe(undefined, { type: 'unexpected' })).toEqual({
      isFetching: false,
      usersMeData: null,
      loaded: false
    });
  });

  it('can handle FETCH_HARVEST_USER', () => {
    expect(
      usersMe(undefined, {
        type: FETCH_HARVEST_USER,
        isFetching: true
      })
    ).toEqual({
      isFetching: true,
      usersMeData: null,
      loaded: false
    });
  });

  it('can handle FETCH_HARVEST_USER_SUCCESS', () => {
    expect(
      usersMe(undefined, {
        type: FETCH_HARVEST_USER_SUCCESS,
        isFetching: false
      })
    ).toEqual({
      isFetching: false,
      usersMeData: undefined,
      loaded: true
    });
  });
});

describe('overtime', () => {
  it('has a default state', () => {
    expect(overtime(undefined, { type: 'unexpected' })).toEqual({
      isFetching: false,
      overtimeData: {},
      loaded: false
    });
  });

  it('can handle FETCH_OVERTIME', () => {
    expect(
      overtime(undefined, {
        type: FETCH_OVERTIME,
        isFetching: true
      })
    ).toEqual({
      isFetching: true,
      overtimeData: {},
      loaded: false
    });
  });

  it('can handle FETCH_OVERTIME_SUCCESS', () => {
    expect(
      overtime(undefined, fetchOvertimeSuccess({ loggedTimesYearMonth: {} }))
    ).toEqual({
      isFetching: false,
      overtimeData: { loggedTimesYearMonth: {} },
      loaded: true
    });
  });

  it('can handle INVALIDATE_OVERTIME', () => {
    expect(
      overtime(undefined, {
        type: INVALIDATE_OVERTIME,
        isFetching: false
      })
    ).toEqual({
      isFetching: false,
      overtimeData: {},
      loaded: false
    });
  });
});
