import React from 'react';
import { shallow } from 'enzyme';

import { LoginPage } from '../../components/LoginPage';

let wrapper, loginSpy;

beforeAll(() => {
    loginSpy = jest.fn();
    wrapper = shallow(<LoginPage startLogin={loginSpy} />);
})

test('should render LoginPage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should call startLogin on button click', () => {
    wrapper.find('button').simulate('click');
    
    expect(loginSpy).toHaveBeenCalled();
});