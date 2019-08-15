import * as React from 'react';
import styled from 'styled-components';
import { DefaultPadding } from './DefaultPadding';

const Black = styled(DefaultPadding)`
  color: white;
  background: black;
`;

export const Widget = () => <Black>Widget</Black>;
