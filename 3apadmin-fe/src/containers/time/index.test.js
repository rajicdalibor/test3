import Time from './index';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import { Response } from 'whatwg-fetch';
import { fetchHarvestUser } from '../../actions/3apadmin/time';

const mockStore = configureMockStore();
const initialState = {
  users: { isFetching: false, userData: [] },
  usersMe: { usersMeData: {} },
  aaapuser: { aaapuserData: {} }
};

Enzyme.configure({ adapter: new Adapter() });

describe('Time - Shallow Render ', () => {
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<Time store={store} />).dive();
  });

  it('render the connect component', () => {
    expect(container.length).toEqual(1);
  });

  it('calls request and success actions if the fetch response was successful', () => {
    const expectedActions = store.getActions();
    expect(expectedActions).toEqual([fetchHarvestUser()]);
  });
});
