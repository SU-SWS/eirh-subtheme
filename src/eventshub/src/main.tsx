import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('su-eventshub');
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
