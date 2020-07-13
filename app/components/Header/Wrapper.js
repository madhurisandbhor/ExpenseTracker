/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export default styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  height: 6rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  box-shadow: 0 0.4rem 0.8rem 0 rgba(0, 0, 0, 0.2);
  background-color: ${props => props.theme.tracker.white};
  @media (max-width: 768px) {
    flex-direction: column;
    height: 8rem;
    padding: 0.5rem;
    align-items: center;
    justify-content: space-around;
  }
`;
