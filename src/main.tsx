import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './routes/root/root';
import { loader as rootLoader } from './routes/root/loader';
import { action as rootAction } from './routes/root/action';
import ErrorPage from './routes/error/error-page';
import Contact from './routes/contact/contact';
import { loader as contactLoader } from './routes/contact/loader';
import EditContact from './routes/edit/edit';
import { action as editAction } from './routes/edit/action';
import { action as destroyAction } from './routes/destroy/action';
import { action as contactAction } from './routes/contact/action';
import Index from './routes';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		loader: rootLoader,
		action: rootAction,
		children: [
			{
				/**
				 * Routes can be used without a path, which lets them participate
				 * in the UI layout without requiring new path segments in the URL.
				 */
				errorElement: <ErrorPage />,
				children: [
					{ index: true, element: <Index /> },
					{
						path: 'contacts/:contactId',
						element: <Contact />,
						loader: contactLoader,
						action: contactAction,
					},
					{
						path: 'contacts/:contactId/edit',
						element: <EditContact />,
						loader: contactLoader,
						action: editAction,
					},
					{
						path: 'contacts/:contactId/destroy',
						action: destroyAction,
						errorElement: <div>Oops! There was an error.</div>,
					},
				],
			},
		],
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
