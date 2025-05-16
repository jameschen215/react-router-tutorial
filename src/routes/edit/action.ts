import { redirect, type LoaderFunctionArgs } from 'react-router-dom';
import { updateContact } from '../../data/contacts';

// edit action
type ActionType = LoaderFunctionArgs & {
	request: Request;
};

export async function action({ request, params }: ActionType) {
	const formData = await request.formData();
	const updateData = Object.fromEntries(formData);
	const id = params.contactId;

	await updateContact(id, updateData);

	return redirect(`/contacts/${id}`);
}
