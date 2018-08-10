import {
  fetchAAAPUser,
  fetchAAAPUserSuccess,
  FETCH_AAAP_USER,
  FETCH_AAAP_USER_SUCCESS
} from './index';

describe('Overtime action', () => {
  const aaapuser = {
    firstName: 'FName',
    lastName: 'LName'
  };

  it('should create an action to request user', () => {
    const expectedAction = {
      type: FETCH_AAAP_USER
    };
    expect(fetchAAAPUser()).toEqual(expectedAction);
  });

  it('should create an action to receive user', () => {
    const expectedAction = {
      type: FETCH_AAAP_USER_SUCCESS,
      payload: aaapuser
    };
    expect(fetchAAAPUserSuccess(aaapuser)).toEqual(expectedAction);
  });
});
