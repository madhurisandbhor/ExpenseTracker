import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const activeClassName = 'active';

export default styled(NavLink).attrs({
  activeClassName,
})`
  display: inline-flex;
  padding: .8rem 2rem;
  color: ${props => props.theme.tracker.white};
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: Roboto, sans-serif;
  font-size: 1.8rem;
  font-weight: 200;
  align-items: center;
  height: 6rem;

 &:hover {
    // background: ${props => props.theme.palette.primary.main};
    color: ${props => props.theme.palette.primary.dark};
    // ${props => props.theme.palette.primary.main};
  }
  &:active, &.${activeClassName} {
    background: ${props => props.theme.palette.primary.dark};
    color: ${props => props.theme.tracker.white};
  }
`;
