import SnackbarMessage from './index';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Snackbar - Shallow Render ', () => {
  let container;

  beforeEach(() => {
    container = shallow(<SnackbarMessage state={false} />);
  });

  it('render the connect component', () => {
    expect(container.length).toEqual(1);
  });
});
