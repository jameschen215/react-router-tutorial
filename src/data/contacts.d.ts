import { Contact } from './types';

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
