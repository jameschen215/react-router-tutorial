import { Form, useLoaderData, useNavigate } from 'react-router-dom';

export default function EditContact() {
	const contact = useLoaderData();
	const navigate = useNavigate();

	return (
		<Form method="post" id="contact-form">
			<p>
				<span>Name</span>
				<input
					type="text"
					name="first"
					id="first"
					aria-label="First name"
					placeholder="First name"
					defaultValue={contact?.first}
				/>
				<input
					type="text"
					name="last"
					id="last"
					aria-label="Last name"
					placeholder="Last name"
					defaultValue={contact?.last}
				/>
			</p>

			<label>
				<span>Twitter</span>
				<input
					type="text"
					name="twitter"
					id="twitter"
					placeholder="@jack"
					defaultValue={contact?.twitter}
				/>
			</label>

			<label>
				<span>Avatar</span>
				<input
					type="text"
					name="avatar"
					id="avatar"
					placeholder="https://example.com/avatar.jpg"
					aria-label="Avatar URL"
					defaultValue={contact?.avatar}
				/>
			</label>

			<label>
				<span>Notes</span>
				<textarea
					name="notes"
					id="notes"
					rows={6}
					defaultValue={contact?.notes}
				/>
			</label>

			<p>
				<button type="submit">Save</button>
				<button type="button" onClick={() => navigate(-1)}>
					Cancel
				</button>
			</p>
		</Form>
	);
}
