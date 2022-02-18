import 'react-native-gesture-handler';
import React from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {MainNavigation} from './src/navigation/Navigation';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/authRedux/AuthStore';
LogBox.ignoreAllLogs();
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
