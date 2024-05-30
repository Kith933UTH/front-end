import React from 'react';
import { RouterProvider } from 'react-router-dom';
import RouterComponent from './routes';
import Notification from './components/Notification/Notification';

function App() {
	const router = RouterComponent();
	return (
		<div className="bg-background relative w-full min-h-screen text-text font-body *:selection:!text-gray-900 *:selection:!bg-highlight">
			<RouterProvider router={router} />
			<Notification />
		</div>
	);
}

export default App;
