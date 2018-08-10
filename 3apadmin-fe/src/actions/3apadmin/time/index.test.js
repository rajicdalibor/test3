import {
  FETCH_HARVEST_USER,
  FETCH_HARVEST_USER_SUCCESS,
  FETCH_HARVEST_USERS,
  FETCH_HARVEST_USERS_SUCCESS,
  FETCH_OVERTIME,
  FETCH_OVERTIME_SUCCESS,
  INVALIDATE_OVERTIME,
  fetchHarvestUser,
  fetchHarvestUserSuccess,
  fetchHarvestUsers,
  fetchHarvestUsersSuccess,
  fetchOvertime,
  fetchOvertimeSuccess,
  invalidateOvertime
} from './index';

const adminTime = 22;

describe('Requests user me', () => {
  it('should create an action for request users me', () => {
    const expectedAction = {
      type: FETCH_HARVEST_USER
    };
    expect(fetchHarvestUser(adminTime)).toEqual(expectedAction);
  });

  it('should create an action for receive users', () => {
    const expectedAction = {
      type: FETCH_HARVEST_USER_SUCCESS,
      payload: adminTime
    };
    expect(fetchHarvestUserSuccess(adminTime)).toEqual(expectedAction);
  });

  it('should create an action for request users', () => {
    const expectedAction = {
      type: FETCH_HARVEST_USERS
    };
    expect(fetchHarvestUsers()).toEqual(expectedAction);
  });

  it('should create an action for receive users', () => {
    const expectedAction = {
      type: FETCH_HARVEST_USERS_SUCCESS,
      payload: adminTime
    };
    expect(fetchHarvestUsersSuccess(adminTime)).toEqual(expectedAction);
  });

  it('should create an action for request overtime', () => {
    const expectedAction = {
      type: FETCH_OVERTIME,
      payload: adminTime
    };
    expect(fetchOvertime(adminTime)).toEqual(expectedAction);
  });

  it('should create an action for receive overtime', () => {
    const expectedAction = {
      type: FETCH_OVERTIME_SUCCESS,
      payload: adminTime
    };
    expect(fetchOvertimeSuccess(adminTime)).toEqual(expectedAction);
  });

  it('should create an action for invalidate overtime', () => {
    const expectedAction = {
      type: INVALIDATE_OVERTIME
    };
    expect(invalidateOvertime()).toEqual(expectedAction);
  });
});
