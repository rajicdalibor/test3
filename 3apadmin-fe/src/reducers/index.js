// @flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as fromAaapuser from './3apapi';
import * as fromHarvestUser from './3apadmintime';
import { createSelector } from 'reselect';

const reducers = {
  routing: routerReducer,
  users: fromHarvestUser.users,
  usersMe: fromHarvestUser.usersMe,
  overtime: fromHarvestUser.overtime,
  aaapuser: fromAaapuser.aaapuser,
  project: fromHarvestUser.project
};

export type Reducers = typeof reducers;

export default combineReducers(reducers);

/*
export const getUsers = state => state.users;
export const getUsersMe = state => state.usersMe;
export const getOvertime = state => state.overtime;*/

/**
 * AAPUSER SELECTORS
 */
export const getAaapuser = (state: State) => state.aaapuser;
export const getAaapuserData = createSelector(
  getAaapuser,
  fromAaapuser.getAaapuserData
);
export const isAaaapUserLoaded = createSelector(
  getAaapuser,
  fromAaapuser.getAaapuserLoaded
);

/**
 * HARVEST USER SELECTORS
 */
export const getHarvestUser = (state: State) => state.usersMe;

export const getHarvestUserData = createSelector(
  getHarvestUser,
  fromHarvestUser.getHarvestUserData
);

export const isHarvestUserAdmin = createSelector(
  getHarvestUser,
  fromHarvestUser.isHarvestUserAdmin
);

export const isHarvestUserLoaded = createSelector(
  getHarvestUser,
  fromHarvestUser.getHarvestUserLoaded
);

/**
 * HARVEST USERS SELECTORS
 */
export const getHarvestUsers = (state: State) => state.users;
export const getHarvestUsersData = createSelector(
  getHarvestUsers,
  fromHarvestUser.getHarvestUsersData
);

export const isHarvestUsersLoaded = createSelector(
  getHarvestUsers,
  fromHarvestUser.getHarvestUserLoaded
);

/**
 * HARVEST OVERTIME SELECTORS
 */
export const getOvertimes = (state: State) => state.overtime;
export const getOvertimeData = createSelector(
  getOvertimes,
  fromHarvestUser.getOvertimeData
);
export const isOvertimesLoaded = createSelector(
  getOvertimes,
  fromHarvestUser.getHarvestUserLoaded
);

export const getTotalOvertime = createSelector(
  getOvertimes,
  fromHarvestUser.getTotalOvertime
);


/**
 * HARVEST PROJECT SELECTORS
 */

export const getHarvestProject = (state: State) => state.project;

export const isHarvestProjectLoaded = createSelector(
  getHarvestProject,
  fromHarvestUser.getProjectData
);
