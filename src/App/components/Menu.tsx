import * as React from 'react';
import styled from 'styled-components';
import { DefaultPadding } from './DefaultPadding';

const MenuFlex = styled.menu`
  display: flex;
  padding: 0;
  margin: 0;
`;

const Link = styled(DefaultPadding).attrs({target: '_blank'})`
  display: block;
  width: 100%;
  text-align: center;
  padding: 8px;
  font-weight: bold;
  &:hover {
    color: black;
    background: darkgrey;      
  }
`.withComponent('a');

export const Menu = () => <MenuFlex>
  <Link href="storybook">storybook</Link>

  <Link href="coverage/lcov-report/index.html">coverage</Link>
</MenuFlex>;
