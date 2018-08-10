// @flow
export const FETCH_AAAP_USER = 'FETCH_AAAP_USER';
export const FETCH_AAAP_USER_SUCCESS = 'FETCH_AAAP_USER_SUCCESS';
export const FETCH_AAAP_USER_FAIL = 'FETCH_AAAP_USER_FAIL';
export const LOGOUT_AAAP_USER = 'LOGOUT_AAAP_USER';

export const fetchAAAPUser = (): Action => ({
  type: FETCH_AAAP_USER
});

export const fetchAAAPUserSuccess = (aaapuser: User): Action => ({
  type: FETCH_AAAP_USER_SUCCESS,
  payload: aaapuser
});

export const fetchAAAPUserFail = (error: Error): Action => ({
  type: FETCH_AAAP_USER_FAIL,
  payload: error
});

export const logoutAAAPUser = (): Action => ({
  type: LOGOUT_AAAP_USER
});
