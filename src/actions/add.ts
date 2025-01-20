import { db } from "~lib/db";

export const add = ({ description }: { description?: string }) => {
	if (!description) {
		console.log("Error: Description is required.");
		return;
	}

	const { id } = db.insert({ description, status: "todo" });

	console.log(`Task added successfully (ID: ${id})`);
};
