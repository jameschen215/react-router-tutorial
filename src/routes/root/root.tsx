import {
	Form,
	NavLink,
	Outlet,
	useLoaderData,
	useNavigation,
	useSubmit,
} from 'react-router-dom';

import type { Contact } from '../../data/types';
import { useEffect, useState } from 'react';

export default function Root() {
	const { contacts, q } = useLoaderData() as { contacts: Contact[]; q: string };
	const [query, setQuery] = useState(q);
	const navigation = useNavigation();
	const submit = useSubmit();

	/**
	 * The navigation.location will show up when the app is
	 * navigating to a new URL and loading the data for it.
	 * It then goes away when there is no pending navigation anymore.
	 */
	const searching =
		navigation.location &&
		new URLSearchParams(navigation.location.search).has('q');

	// const searchRef = useRef<HTMLInputElement | null>(null);

	// useEffect(() => {
	// 	if (searchRef.current) {
	// 		searchRef.current.value = q;
	// 	}
	// }, [q]);

	useEffect(() => {
		setQuery(q);
	}, [q]);

	function handleSearchChange(ev: React.ChangeEvent<HTMLInputElement>) {
		setQuery(ev.target.value);

		/**
		 * We only want to replace search results, not the page before we started
		 * searching, so we do a quick check if this is the first search or not
		 * and then decide to replace.
		 * Each key stroke no longer creates new entries, so the user can click
		 * back out of the search results without having to click it 7 times 😅.
		 */
		const isFirstSearch = q === null;
		submit(ev.currentTarget.form, { replace: !isFirstSearch });
	}

	return (
		<>
			<div id="sidebar">
				<h1>React Router Contacts</h1>

				<div>
					<Form role="search" id="search-form">
						<input
							// ref={searchRef}
							className={searching ? 'loading' : ''}
							type="search"
							name="q"
							id="q"
							aria-label="Search contacts"
							placeholder="Search"
							// defaultValue={q}
							value={query}
							onChange={handleSearchChange}
						/>

						<div id="search-spinner" aria-hidden={true} hidden={!searching} />
						<div className="sr-only" aria-live="polite" />
					</Form>

					<Form method="post">
						<button type="submit">New</button>
					</Form>
				</div>

				<nav>
					{contacts.length > 0 && (
						<ul>
							{contacts.map((contact) => (
								<li key={contact.id}>
									<NavLink
										to={`contacts/${contact.id}`}
										className={({ isActive, isPending }) =>
											isActive ? 'active' : isPending ? 'pending' : ''
										}>
										{contact.first || contact.last ? (
											<>
												{contact.first} {contact.last}
											</>
										) : (
											<i>No Name</i>
										)}{' '}
										{contact.favorite && <span>★</span>}
									</NavLink>
								</li>
							))}
						</ul>
					)}

					{contacts.length <= 0 && (
						<p>
							<i>No contacts.</i>
						</p>
					)}
				</nav>
			</div>

			<div
				id="detail"
				className={navigation.state === 'loading' ? 'loading' : ''}>
				<Outlet />
			</div>
		</>
	);
}
