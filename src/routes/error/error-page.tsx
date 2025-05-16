import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
	const error = useRouteError();
	let errorInfo = '';

	if (error instanceof Error) {
		errorInfo = error.message;
	} else if (error instanceof Response) {
		errorInfo = error.statusText;
	}

	return (
		<div id="error-page">
			<h1>Oops!</h1>

			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{errorInfo}</i>
			</p>
		</div>
	);
}
