// @flow
import {
  FETCH_AAAP_USER,
  FETCH_AAAP_USER_SUCCESS,
  FETCH_AAAP_USER_FAIL,
  LOGOUT_AAAP_USER
} from '../actions/3apadmin/api';

type aaapuserState = {
  aaapuserData: ?User,
  isFetching: boolean,
  error: ?Error,
  loaded: boolean
};

type fetchAaapUserAction = {
  type: typeof FETCH_AAAP_USER
};

type fetchAaapUserSucessAction = {
  type: typeof FETCH_AAAP_USER_SUCCESS,
  payload: User
};

type fetchAaapUserFailureAction = {
  type: typeof FETCH_AAAP_USER_FAIL,
  payload: User
};

type logoutAAAPUsersAction = {
  type: typeof LOGOUT_AAAP_USER
};

type usersMeAction =
  | fetchAaapUserAction
  | fetchAaapUserSucessAction
  | fetchAaapUserFailureAction
  | logoutAAAPUsersAction;

const initialState = {
  aaapuserData: null,
  isFetching: false,
  error: null,
  loaded: false
};

export const aaapuser = (
  state: aaapuserState = initialState,
  action: usersMeAction
) => {
  switch (action.type) {
    case FETCH_AAAP_USER:
      return {
        ...state,
        error: null,
        isFetching: true,
        loaded: false
      };
    case FETCH_AAAP_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        aaapuserData: action.payload,
        loaded: true
      };
    case FETCH_AAAP_USER_FAIL:
      return {
        ...state,
        isFetching: false,
        aaapuserData: null,
        error: action.payload,
        loaded: false
      };
    case LOGOUT_AAAP_USER:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export const getAaapuserLoaded = (state: State) => state.loaded;

export const getAaapuserData = (state: State) => state.aaapuserData;

export const getIsFetching = (state: State) => state.isFetching;

export const getError = (state: State) => state.error;
