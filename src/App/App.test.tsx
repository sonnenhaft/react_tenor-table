import a from './sample-ts-import';
import b from './sample-js-import';
import { App } from './App';
import { shallow, mount } from 'enzyme';
import * as React from 'react';

test('should return false given external link', () => {
  a();
  b();

  shallow(<App />);
  mount(<App />);
  expect(false).toBe(false);
});
