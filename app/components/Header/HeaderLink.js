import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

const activeClassName = 'active';

const IconButtonWrapper = withStyles(theme => ({
  root: {
    '&:hover': {
      background: theme.palette.primary.dark,
    }
  },
}))(NavLink);


export default styled(NavLink).attrs({
  activeClassName: activeClassName,
})`
  display: inline-flex;
  padding: 1rem 2rem;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: Roboto, sans-serif;
  font-size: 1.8rem;
  font-weight: 200;

  &:active, &:hover,&.${activeClassName} {
    color: ${props=>props.theme.palette.primary.dark};
  }
`;
