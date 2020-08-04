import styled from 'styled-components';

const Wrapper = styled.footer`
  display: flex;
  justify-content: space-around;
  padding: 2.5rem 5rem 0.5rem 5rem;
  // border-top: 1px solid #666;
  background: ${props => props.theme.palette.primary.main};
  font-size: 1.4rem;
  color: white;
  margin: 0 0.5rem 0.5rem 0.5rem;
`;

export default Wrapper;
