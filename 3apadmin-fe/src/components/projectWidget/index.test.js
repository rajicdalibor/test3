import projectWidget from './index';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

const initialState = {
  project: {
    projectsMe: []
  }
};

Enzyme.configure({ adapter: new Adapter() });

describe('projectWidget - Shallow Render ', () => {
  let container, store;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<projectWidget store={store} />);
  });

  it('render the connect component', () => {
    expect(container.length).toEqual(1);
  });
});
