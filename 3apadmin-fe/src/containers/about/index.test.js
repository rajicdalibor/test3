import About from './index';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('About - Shallow Render ', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<About />);
  });

  it('render the DUMB component', () => {
    expect(wrapper.length).toEqual(1);
  });
});
