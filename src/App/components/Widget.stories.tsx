import React from 'react';
import { Widget } from './Widget';

import { storiesOf } from '@storybook/react';

storiesOf('App', module)
  .add('Widget', () => <Widget />);
