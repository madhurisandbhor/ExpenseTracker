import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

const reducer = (info, newInfo) => {
  if (newInfo === null) {
    localStorage.removeItem('info');
    return initialState;
  }
  return { ...info, ...newInfo };
};

const initialState = {
  isLoggedIn: false,
  isRegister: false,
  username: '',
};

const localState = JSON.parse(localStorage.getItem('info'));

const InfoContext = React.createContext();

const InfoProvider = props => {
  const [info, setInfo] = useReducer(reducer, localState || initialState);

  // whenever context info is updated it will update localstorage
  useEffect(() => {
    localStorage.setItem('info', JSON.stringify(info));
  }, [info]);

  return (
    <InfoContext.Provider value={{ info, setInfo }}>
      {props.children}
    </InfoContext.Provider>
  );
};

InfoProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { InfoContext, InfoProvider };
