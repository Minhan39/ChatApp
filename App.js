import React from 'react';
import Root from './src/navigations/Root';
import {ProfileProvider} from './src/services/ProfileContext';

const App = () => {
  return (
    <ProfileProvider>
      <Root />
    </ProfileProvider>
  );
};

export default App;
