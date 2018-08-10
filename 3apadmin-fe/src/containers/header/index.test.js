import Header from './index';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore();
const initialState = {
  aaapuser: {}
};

Enzyme.configure({ adapter: new Adapter() });

describe('Header - Shallow Render ', () => {
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<Header store={store} />);
  });

  it('render the connect component', () => {
    expect(container.length).toEqual(1);
  });
});
