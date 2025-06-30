import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import MUITheme from './MUITheme/MUITheme';
import TaskBoard from './containers/TaskBoard';

const App = () => (
  <Provider store={store}>
    <MUITheme>
      <TaskBoard />
    </MUITheme>
  </Provider>
);
export default App;
