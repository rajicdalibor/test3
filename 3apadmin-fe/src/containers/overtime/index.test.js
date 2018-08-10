import Overtime from './index';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

const initialState = {
  overtime: { isFetching: false, overtimeData: {} },
  totalOvertime: { totalOvertime: {} },
  aaapuser: { aaapuserData: {} },
  usersMe: { usersMeData: {} }
};

Enzyme.configure({ adapter: new Adapter() });

describe('Overtime - Shallow Render ', () => {
  let container, store;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<Overtime store={store} />);
  });

  it('render the connect component', () => {
    expect(container.length).toEqual(1);
  });

  it('getting the props value', () => {
    expect(container.prop('isFetching')).toEqual(false);
  });
});
