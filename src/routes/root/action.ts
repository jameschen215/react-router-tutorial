import { createContact } from '../../data/contacts';
import type { Contact } from '../../data/types';

export async function action() {
	const contact = (await createContact()) as Contact;

	return { contact };
}
