import { db } from "~lib/db";
import { createMessage } from "~lib/show-data";

export const remove = ({ id }: { id?: number }) => {
	if (!id) {
		console.log(createMessage("Error: ID is required."));
		return;
	}

	const isDeleted = db.delete(id);

	if (!isDeleted) {
		console.log(createMessage("Error: Task not found."));
		return;
	}

	console.log(createMessage(`Task ${id} removed.`));
};
