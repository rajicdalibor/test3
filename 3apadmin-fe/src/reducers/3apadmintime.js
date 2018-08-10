// @flow
import {
  FETCH_HARVEST_USER,
  FETCH_HARVEST_USER_SUCCESS,
  FETCH_HARVEST_USERS,
  FETCH_HARVEST_USERS_SUCCESS,
  FETCH_OVERTIME,
  FETCH_OVERTIME_SUCCESS,
  INVALIDATE_OVERTIME,
  FETCH_PROJECT,
  FETCH_PROJECT_SUCCESS,
  FETCH_PROJECT_FAIL,
  FETCH_OVERTIME_FAIL
} from '../actions/3apadmin/time';
import moment from 'moment/moment';
import { createSelector } from 'reselect';

export const calculateTotalOvertime = (overtimeData: any) => {
  if (overtimeData) {
    const loggedTime = overtimeData.loggedTimesYearMonth;

    if (!loggedTime) {
      return 0;
    }
    const loggedValues = Object.keys(overtimeData.loggedTimesYearMonth).map(
      key => overtimeData.loggedTimesYearMonth[key]
    );

    return loggedValues
      .map(({ actualTime, targetTime }) =>
        moment.duration(actualTime - targetTime, 'seconds').asHours()
      )
      .reduce((totalOvertime, timeDiff) => totalOvertime + timeDiff, 0);
  }
};

type usersMeState = {
  isFetching: boolean,
  usersMeData: ?HarvestUser,
  loaded: boolean
};

type fetchHarvestUserAction = {
  type: typeof FETCH_HARVEST_USER
};

type fetchHarvestUserSuccessAction = {
  type: typeof FETCH_HARVEST_USER_SUCCESS,
  payload: User
};

type usersMeAction = fetchHarvestUserAction | fetchHarvestUserSuccessAction;

export const usersMe = (
  state: usersMeState = {
    isFetching: false,
    usersMeData: null,
    loaded: false
  },
  action: usersMeAction
) => {
  switch (action.type) {
    case FETCH_HARVEST_USER:
      return {
        ...state,
        isFetching: true,
        loaded: false
      };
    case FETCH_HARVEST_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        usersMeData: action.payload,
        loaded: true
      };
    default:
      return state;
  }
};

type usersState = {
  isFetching: boolean,
  userData: ?Array<HarvestUser>,
  loaded: boolean
};

type fetchHarvestUsersAction = {
  type: typeof FETCH_HARVEST_USERS
};

type fetchHarvestUsersSuccessAction = {
  type: typeof FETCH_HARVEST_USERS_SUCCESS,
  payload: User
};

type usersAction = fetchHarvestUsersAction | fetchHarvestUsersSuccessAction;

export const users = (
  state: usersState = {
    isFetching: false,
    userData: [],
    loaded: false
  },
  action: usersAction
) => {
  switch (action.type) {
    case FETCH_HARVEST_USERS:
      return {
        ...state,
        isFetching: true,
        loaded: false
      };
    case FETCH_HARVEST_USERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        userData: action.payload,
        loaded: true
      };
    default:
      return state;
  }
};

const intitalState = {
  isFetching: false,
  overtimeData: {},
  loaded: false
};

type fetchOvertimeAction = {
  type: typeof FETCH_OVERTIME,
  payload: number
};

type fetchOvertimeSuccessAction = {
  type: typeof FETCH_OVERTIME_SUCCESS,
  payload: OvertimeType
};

type invalidateOvertimeAction = {
  type: typeof INVALIDATE_OVERTIME,
  payload: number
};

type overtimeAction =
  | fetchOvertimeAction
  | fetchOvertimeSuccessAction
  | invalidateOvertimeAction;

type overtimeState = {
  isFetching: boolean,
  overtimeData: Object,
  loaded: boolean
};

export const overtime = (
  state: overtimeState = intitalState,
  action: overtimeAction
) => {
  switch (action.type) {
    case FETCH_OVERTIME:
      return {
        ...state,
        isFetching: true,
        loaded: false
      };
    case FETCH_OVERTIME_SUCCESS:
      return {
        ...state,
        isFetching: false,
        overtimeData: action.payload,
        loaded: true
      };
    case FETCH_OVERTIME_FAIL:
      return {
        ...state,
        isFetching: false,
        overtimeData: {},
        loaded: true
      };
    case INVALIDATE_OVERTIME:
      return intitalState;
    default:
      return state;
  }
};

const intitalStateProject = {
  uploadStatus: false,
  projectAssignments: [],
  selectedProjectId: 0,
  selectedTaskId: 0,
  entries: [],
  createdEntries: [],
  isFetching: false,
  loaded: false,
  projectsMe: null
};

type projectState = {
  isFetching: boolean,
  loaded: boolean,
  projectsMe: ?HarvestProject
};

type fetchProjectAction = {
  type: typeof FETCH_PROJECT,
  payload: number
};

type fetchProjectSuccessAction = {
  type: typeof FETCH_PROJECT_SUCCESS,
  payload: HarvestProject
};

type projectAction = fetchProjectAction | fetchProjectSuccessAction;

export const project = (
  state: projectState = intitalStateProject,
  action: projectAction
) => {
  switch (action.type) {
    case FETCH_PROJECT:
      return {
        ...state,
        isFetching: true,
        loaded: false
      };
    case FETCH_PROJECT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        projectsMe: action.payload,
        loaded: true
      };
      case FETCH_PROJECT_FAIL:
          return {
              ...state,
              isFetching: false,
              loaded: true
          };
    default:
      return state;
  }
};

export const getHarvestUserLoaded = (state: State) => state.loaded;

export const getHarvestUserData = (state: State) => state.usersMeData;

export const getHarvestUsersData = (state: State) => state.userData;

export const getOvertimeData = (state: State) => state.overtimeData;

export const getProjectData = (state: State) => state.projectsMe;

export const getTotalOvertime = createSelector(
  getOvertimeData,
  calculateTotalOvertime
);

export const isHarvestUserAdmin = createSelector(
  getHarvestUserData,
  harvestUser => harvestUser && harvestUser.admin
);
