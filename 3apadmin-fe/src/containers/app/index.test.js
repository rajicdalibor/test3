import { AppContainer } from './index';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import { fetchAAAPUser } from '../../actions/3apadmin/api';
import { Response } from 'whatwg-fetch';

const mockStore = configureMockStore();
const initialState = {
  aaapuser: { isFetching: false, error: null },
  usersMe: { usersMeData: {} }
};

Enzyme.configure({ adapter: new Adapter() });

describe('App - Shallow Render ', () => {
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<AppContainer store={store} />).dive();
  });

  it('render the connect component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('calls request and success actions if the fetch response was successful', () => {
    const expectedActions = store.getActions();
    expect(expectedActions).toEqual([fetchAAAPUser()]);
  });
});
