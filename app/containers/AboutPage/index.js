/**
 *
 * AboutPage
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: auto;
  padding: 5rem;
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.palette.background.paper};
`;

const Para = styled.p`
  font-size: 1.5rem;
  margin: 1rem;
  span:first-child {
    font-weight: bold;
    color: ${props => props.theme.palette.primary.main};
  }
  span:nth-child(2) {
    margin-left: 0.2rem;
  }
`;

const AboutPage = () => (
  <Wrapper>
    <Para>
      This is an Expense Tracker app where you can track your expenses with few
      clicks. This app provides comparison between yearly, monthly & weekly
      expenses, category wise comparison. Currently this app provides limited
      functionality. Future scope includes user will be able to add group
      expenses by means user can share expenses with other users and calculate.
    </Para>
    <Para>
      <span>Technologies/Frameworks :</span>
      <span>
        react hooks, redux, material ui, styled components, node JS and mysql
      </span>
    </Para>
    <Para>
      <span>Author :</span>
      <span>Madhuri Sandbhor (madhurisandbhor@gmail.com)</span>
    </Para>
  </Wrapper>
);

AboutPage.propTypes = {};

export default memo(AboutPage);
