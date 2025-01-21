import { db } from "~lib/db";
import { createMessage, createTable } from "~lib/show-data";

export const markDone = ({ id }: { id?: number }) => {
	if (!id) {
		console.log(createMessage("Error: ID is required."));
		return;
	}

	const isUpdated = db.update(id, { status: "done" });

	if (!isUpdated) {
		console.log(createMessage("Error: Task not found."));
		return;
	}

	console.log(createTable([...db.select({ id })]));
};
