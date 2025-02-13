import AppNavigation from './src/navigations/AppNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import GlobalLoader from './src/views/Loader';
import { requestNotificationPermissions, configureNotificationHandler } from './src/services/notification';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    requestNotificationPermissions();
    configureNotificationHandler();
  }, []);

  return (
    <Provider store={store}>
      <GlobalLoader />
      <AppNavigation />
    </Provider>
  )
}

export default App;