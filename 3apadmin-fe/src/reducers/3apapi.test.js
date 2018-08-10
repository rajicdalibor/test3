import { FETCH_AAAP_USER } from '../actions/3apadmin/api';
import { aaapuser } from './3apapi';

describe('AAAPUSER', () => {
  it('has a default state', () => {
    expect(aaapuser(undefined, { type: 'unexpected' })).toEqual({
      isFetching: false,
      error: null,
      aaapuserData: null,
      loaded: false
    });
  });

  it('can handle FETCH_AAAP_USER_BEGIN', () => {
    expect(
      aaapuser(undefined, {
        type: FETCH_AAAP_USER
      })
    ).toEqual({
      isFetching: true,
      aaapuserData: null,
      error: null,
      loaded: false
    });
  });
});
