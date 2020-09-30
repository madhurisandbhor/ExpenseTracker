import styled from 'styled-components';

const Wrapper = styled.footer`
  display: flex;
  justify-content: space-around;
  padding: 2rem 5rem 0.5rem 5rem;
  font-size: 1.4rem;
  background: ${props => props.theme.tracker.grey};
  color: ${props => props.theme.tracker.black};
  margin-top: 0.5rem;
`;

export default Wrapper;
