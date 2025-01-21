import { db } from "~lib/db";
import { createMessage, createTable } from "~lib/show-data";

export const update = ({
	id,
	description,
}: {
	id?: number;
	description?: string;
}) => {
	if (!id || !description) {
		console.log(createMessage("Error: ID and description are required."));
		return;
	}

	const isUpdated = db.update(id, { description });

	if (!isUpdated) {
		console.log(createMessage("Error: Task not found."));
		return;
	}

	console.log(createTable([...db.select({ id })]));
};
