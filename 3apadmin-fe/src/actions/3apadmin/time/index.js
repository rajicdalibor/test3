//@flow
export const FETCH_HARVEST_USER = 'FETCH_HARVEST_USER';
export const FETCH_HARVEST_USER_SUCCESS = 'FETCH_HARVEST_USER_SUCCESS';
export const FETCH_HARVEST_USER_FAIL = 'FETCH_HARVEST_USER_FAIL';

export const fetchHarvestUser = () => ({
  type: FETCH_HARVEST_USER
});

export const fetchHarvestUserSuccess = (user: User) => ({
  type: FETCH_HARVEST_USER_SUCCESS,
  payload: user
});

export const fetchHarvestUserFail = (error: Error): Action => ({
  type: FETCH_HARVEST_USER_FAIL,
  payload: error
});

export const FETCH_HARVEST_USERS = 'FETCH_HARVEST_USERS';
export const FETCH_HARVEST_USERS_SUCCESS = 'FETCH_HARVEST_USERS_SUCCESS';
export const FETCH_HARVEST_USERS_FAIL = 'FETCH_HARVEST_USERS_FAIL';

export const fetchHarvestUsers = () => ({
  type: FETCH_HARVEST_USERS
});

export const fetchHarvestUsersSuccess = (users: User) => ({
  type: FETCH_HARVEST_USERS_SUCCESS,
  payload: users
});

export const fetchHarvestUsersFail = (error: Error): Action => ({
  type: FETCH_HARVEST_USERS_FAIL,
  payload: error
});

export const FETCH_OVERTIME = 'FETCH_OVERTIME';
export const FETCH_OVERTIME_SUCCESS = 'FETCH_OVERTIME_SUCCESS';
export const FETCH_OVERTIME_FAIL = 'FETCH_OVERTIME_FAIL';
export const INVALIDATE_OVERTIME = 'INVALIDATE_OVERTIME';

export const fetchOvertime = (userId: number) => ({
  type: FETCH_OVERTIME,
  payload: userId
});

export const fetchOvertimeSuccess = (data: User) => ({
  type: FETCH_OVERTIME_SUCCESS,
  payload: data
});

export const fetchOvertimeFail = (error: Error): Action => ({
  type: FETCH_OVERTIME_FAIL,
  payload: error
});

export const invalidateOvertime = () => ({
  type: INVALIDATE_OVERTIME
});

export const FETCH_PROJECT = 'FETCH_PROJECT';
export const FETCH_PROJECT_SUCCESS = 'FETCH_PROJECT_SUCCESS';
export const FETCH_PROJECT_FAIL = 'FETCH_PROJECT_FAIL';

export const fetchProject = () => ({
  type: FETCH_PROJECT
});

export const fetchProjectSuccess = (data: HarvestProject) => ({
  type: FETCH_PROJECT_SUCCESS,
  payload: data
});

export const fetchProjectFail = (error: Error): Action => ({
  type: FETCH_PROJECT_FAIL,
  payload: error
});
