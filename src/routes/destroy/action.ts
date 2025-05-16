import { redirect, type LoaderFunctionArgs } from 'react-router-dom';
import { deleteContact } from '../../data/contacts';

export async function action({ params }: LoaderFunctionArgs) {
	// throw new Error('Oh, dang!');
	await deleteContact(params.contactId);
	return redirect('/');
}
