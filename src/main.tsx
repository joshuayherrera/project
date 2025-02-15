import { createRoot } from 'react-dom/client';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css'; 
import 'primeicons/primeicons.css'; 
import 'primeflex/primeflex.css'; 
import App from './App.tsx';
import './index.css';
import { store } from "./store/store.ts";
import { Provider } from "react-redux";

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
