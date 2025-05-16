import type { LoaderFunctionArgs } from 'react-router-dom';
import { updateContact } from '../../data/contacts';

type ActionType = LoaderFunctionArgs & {
	request: Request;
};

export async function action({ request, params }: ActionType) {
	const id = params.contactId;
	const formData = await request.formData();
	const favorite = formData.get('favorite') === 'true';

	return updateContact(id, { favorite });
}
