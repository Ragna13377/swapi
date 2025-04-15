import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router';
import { QueryProvider } from '@shared/providers/queryProvider';
import store from '@/app/store/store';

const App = () => (
	<StrictMode>
		<QueryProvider>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</QueryProvider>
	</StrictMode>
);

export default App;
