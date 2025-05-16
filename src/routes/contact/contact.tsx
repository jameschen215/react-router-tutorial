import { Form, useFetcher, useLoaderData } from 'react-router-dom';
import type { Contact } from '../../data/types';

export default function Contact() {
	const { contact } = useLoaderData() as { contact: Contact };

	/**
	 * Whenever you have an expected error case in a loader or action–like
	 * the data not existing–you can throw. The call stack will break, React
	 * Router will catch it, and the error path is rendered instead. We won't
	 * even try to render a null contact.
	 */
	if (!contact) {
		throw new Response('', {
			status: 404,
			statusText: 'Not Found',
		});
	}

	return (
		<div id="contact">
			<div>
				<img
					src={
						contact.avatar ||
						`https://robohash.org/${contact.id}.png?size=200x200`
					}
					alt=""
				/>
			</div>

			<div>
				<h1>
					{contact.first || contact.last ? (
						<>
							{contact.first} {contact.last}
						</>
					) : (
						<i>No Name</i>
					)}{' '}
					<Favorite contact={contact} />
				</h1>

				{contact.twitter && (
					<p>
						<a href={`https://twitter.com/${contact.twitter}`} target="_blank">
							{contact.twitter}
						</a>
					</p>
				)}

				{contact.notes && <p>{contact.notes}</p>}

				<div>
					<Form action="edit">
						<button type="submit">Edit</button>
					</Form>

					<Form
						action="destroy"
						method="post"
						onSubmit={(ev) => {
							if (!confirm('Please confirm you want to delete this record!')) {
								ev.preventDefault();
							}
						}}>
						<button type="submit">Delete</button>
					</Form>
				</div>
			</div>
		</div>
	);
}

function Favorite({ contact }: { contact: Contact }) {
	/**
	 * The useFetcher hook allows us to communicate with loaders and actions
	 * without causing a navigation.
	 */
	const fetcher = useFetcher();

	/**
	 * Optimistic UI
	 * The fetcher knows the form data being submitted to the action, so it's
	 * available to you on fetcher.formData. We'll use that to immediately
	 * update the star's state, even though the network hasn't finished.
	 * If the update eventually fails, the UI will revert to the real data.
	 */
	const favorite = fetcher.formData
		? fetcher.formData.get('favorite') === 'true'
		: contact.favorite;

	return (
		/**
		 * Since it's got method="post" it will call the action. Since there is
		 * no <fetcher.Form action="..."> prop, it will post to the route where
		 * the form is rendered.
		 * Instead of always rendering the actual data, we check if the fetcher
		 * has any formData being submitted, if so, we'll use that instead. When
		 * the action is done, the fetcher.formData will no longer exist and we're
		 * back to using the actual data. So even if you write bugs in your
		 * optimistic UI code, it'll eventually go back to the correct state 🥹
		 */
		<fetcher.Form method="post">
			<button
				name="favorite"
				value={favorite ? 'false' : 'true'}
				aria-label={favorite ? 'Remove from favorite' : 'Add to favorites'}>
				{favorite ? '★' : '☆'}
			</button>
		</fetcher.Form>
	);
}
