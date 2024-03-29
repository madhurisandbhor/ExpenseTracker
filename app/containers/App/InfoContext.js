import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
const InfoContext = React.createContext();

const initialState = {
  isLoggedIn: false,
  isRegister: false,
  userId: '',
  username: '',
};

const InfoProvider = props => {
  const [info, setInfo] = useState(initialState);
  const getUserDataURL = 'http://localhost:4000/api/authUser';
  // whenever page refreshes, fetch user data to update user login info
  useEffect(() => {
    async function getUserData() {
      try {
        const result = await fetch(getUserDataURL);
        if (result.status === 200) {
          const data = await result.json();
          setInfo({
            ...info,
            isLoggedIn: !!data,
            isRegister: false,
            userId: data ? data.userId : '',
            username: data ? data.username : '',
          });
        } else {
          console.log('user unathorized');
        }
      } catch (err) {
        console.log(err);
      }
    }
    getUserData();
  }, []);

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
