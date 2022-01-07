import 'react-native-gesture-handler';
import React from 'react';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {MainNavigation} from './src/navigation/Navigation';
import rootReducer from './src/redux/RootReducer';
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};

export default App;
