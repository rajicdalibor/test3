import TimeCardPanel from './index';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';

Enzyme.configure({ adapter: new Adapter() });

describe('TimeCardPanel - Shallow Render ', () => {
  let container;

  beforeEach(() => {
    const props = {
      classes: {},
      userPhoto: '',
      fullname: 'Steve',
      loggedTimes: {},
      totalOvertime: 5
    };

    container = shallow(<TimeCardPanel {...props} />);
  });

  it('render the connect component', () => {
    expect(container.length).toEqual(1);
  });
});
