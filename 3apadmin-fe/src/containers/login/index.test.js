import Login from './index';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const initialState = {};
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

describe('Login - Shallow Render ', () => {
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(
      <Provider store={store}>
        <Login />
      </Provider>
    );
  });

  it('render the connect component', () => {
    expect(container.length).toEqual(1);
  });
});
