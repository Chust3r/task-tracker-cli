import { db } from "~lib/db";
import { createMessage, createTable } from "~lib/show-data";

export const add = ({ description }: { description?: string }) => {
	if (!description) {
		console.log(createMessage("Error: Description is required."));
		return;
	}

	const task = db.insert({ description, status: "todo" });

	console.log(createTable([task]));
};
