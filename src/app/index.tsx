import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { router } from '@/app/router';
import { QueryProvider } from '@shared/providers/queryProvider';
import store from './store';
import { theme } from '@shared/themes';

const App = () => (
	<StrictMode>
		<ThemeProvider theme={theme}>
			<QueryProvider>
				<Provider store={store}>
					<RouterProvider router={router} />
				</Provider>
			</QueryProvider>
		</ThemeProvider>
	</StrictMode>
);

export default App;
