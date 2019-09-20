import React from 'react';
import {mount} from 'enzyme';
import App from './index';

describe('App render', () => {
    it('should render App', () => {
        const component = mount(<App/>);
        expect(component).toMatchSnapshot();

        component.unmount();
    });
});