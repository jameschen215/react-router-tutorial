## What I've learned

### Using JavaScript data fetch file in TypeScript

Add a .d.ds file in the same folder.

```TypeScript
export type Contact = {
	id: string;
	first: string;
	last: string;
	avatar: string;
	twitter: string;
	notes: string;
	favorite: boolean;
	createdAt: number;
};


declare module './contacts' {
	export async function getContacts(query?: string): Promise<Contact[]>;
	export async function createContact(): Promise<Contact>;
	export async function getContact(id?: string): Promise<Contact | null>;
	export async function updateContact(
		id?: string,
		updates: Partial<Omit<Contact, 'id'>>
	): Promise<Contact>;
	export async function deleteContact(id?: string): Promise<boolean>;
}
```
