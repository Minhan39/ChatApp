import React, {createContext, useState} from 'react';

const ProfileContext = createContext();

const ProfileProvider = ({children}) => {
  const [profile, setProfile] = useState({});
  const value = {
    profile,
    setProfile,
  };
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export {ProfileContext, ProfileProvider};
