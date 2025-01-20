import { db } from "~lib/db";

export const remove = ({ id }: { id?: number }) => {
	if (!id) {
		console.log("Error: ID is required.");
		return;
	}

	const isDeleted = db.delete(id);

	if (!isDeleted) {
		console.log("Error: Task not found.");
		return;
	}
};
