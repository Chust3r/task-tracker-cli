import { db } from "~lib/db";

export const markInProgress = ({ id }: { id?: number }) => {
	if (!id) {
		console.log("Error: ID is required.");
		return;
	}

	const isUpdated = db.update(id, { status: "in-progress" });

	if (!isUpdated) {
		console.log("Error: Task not found.");
		return;
	}
};
