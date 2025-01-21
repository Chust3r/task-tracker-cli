import { db } from "~lib/db";
import { createMessage, createTable } from "~lib/show-data";

export const markInProgress = ({ id }: { id?: number }) => {
	if (!id) {
		console.log(createMessage("Error: ID is required."));
		return;
	}

	const isUpdated = db.update(id, { status: "in-progress" });

	if (!isUpdated) {
		console.log(createMessage("Error: Task not found."));
		return;
	}

	console.log(createTable([...db.select({ id })]));
};
