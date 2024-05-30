import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import './index.css';
import { ThemeProvider } from '@material-tailwind/react';
import { refreshToken } from './components/Users/UsersSlice';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const dispatch = store.dispatch;

if (cookies.get('jwt')) {
	dispatch(refreshToken());
}

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</Provider>
);
