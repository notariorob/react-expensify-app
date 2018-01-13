import React from 'react';
import { shallow } from 'enzyme';

import { Header } from '../../components/Header';

let wrapper, logoutSpy;

beforeAll(() => {
  logoutSpy = jest.fn();
  wrapper = shallow(<Header startLogout={logoutSpy} />);
});

test('should render Header correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should call startLogout on button click', () => {
  wrapper.find('button').simulate('click');

  expect(logoutSpy).toHaveBeenCalled();
});