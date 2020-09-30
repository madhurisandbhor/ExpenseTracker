import React from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import EmailIcon from '@material-ui/icons/Email';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import Wrapper from './Wrapper';

const About = styled.section`
  display: flex;
  flex-direction: column;
  align-content: start;
  padding-top: 0.5rem;
`;

const AboutText = styled.section`
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Link = styled.a`
  font-size: 1.5rem;
  margin-right: 0.8rem;
`;

const Text = styled.span`
  margin-left: 2rem;
`;

const MessageText = styled.span`
  margin-bottom: 2rem;
`;

const iconRoot = theme => ({
  fontSize: '2.5rem',
  color: theme.palette.primary.dark,
});

const LinkedInIconWrapper = withStyles(theme => ({
  root: iconRoot(theme),
}))(LinkedInIcon);

const GitHubIconWrapper = withStyles(theme => ({
  root: iconRoot(theme),
}))(GitHubIcon);

const LocationOnIconWrapper = withStyles(theme => ({
  root: iconRoot(theme),
}))(LocationOnIcon);

const PhoneAndroidIconWrapper = withStyles(theme => ({
  root: iconRoot(theme),
}))(PhoneAndroidIcon);

const EmailIconWrapper = withStyles(theme => ({
  root: iconRoot(theme),
}))(EmailIcon);

function Footer() {
  const aboutMessage1 =
    'This is an Expense tracker app created using React hooks, redux & node JS.';
  const aboutMessage2 = 'By Madhuri.';

  return (
    <Wrapper>
      <About>
        <Icons>
          <LocationOnIconWrapper />
          <Text>Boulogne Billancourt, France</Text>
        </Icons>
        <Icons>
          <PhoneAndroidIconWrapper />
          <Text>+33 634409811</Text>
        </Icons>
        <Icons>
          <EmailIconWrapper />
          <Text>madhurisandbhor@gmail.com</Text>
        </Icons>
      </About>
      <About>
        <AboutText>About Us</AboutText>
        <span>{aboutMessage1}</span>
        <MessageText>{aboutMessage2}</MessageText>
        <Icons>
          <Link href="https://www.linkedin.com/in/madhuri-s-73046b41/">
            <LinkedInIconWrapper />
          </Link>
          <Link href="https://www.github.com/madhurisandbhor">
            <GitHubIconWrapper />
          </Link>
        </Icons>
      </About>
    </Wrapper>
  );
}

export default Footer;
