import type { LoaderFunctionArgs } from 'react-router-dom';
import { getContact } from '../../data/contacts';
import type { Contact } from '../../data/types';

export async function loader({ params }: LoaderFunctionArgs) {
	const contact = (await getContact(params.contactId)) as Contact;
	return { contact };
}
