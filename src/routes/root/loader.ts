import { getContacts } from '../../data/contacts';
import type { Contact } from '../../data/types';

export async function loader({ request }: { request: Request }) {
	// handle search
	const url = new URL(request.url);
	const q = url.searchParams.get('q') || '';

	// handle get data
	const contacts = (await getContacts(q)) as Contact[];

	return { contacts, q };
}
