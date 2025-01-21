import { db } from "~lib/db";
import { MatchCase } from "~lib/match-case";
import { createMessage, createTable } from "~lib/show-data";
import type { Task } from "~types";

const printTasks = async (filter?: Partial<Task>) => {
	const data = db.select(filter);

	if (data.length === 0) {
		console.log(createMessage("No tasks found"));
		return;
	}

	console.log(createTable(data));
};
export const list = ({ status }: { status?: string }) => {
	if (!status) {
		printTasks();
		return;
	}

	const tasks = new MatchCase();

	tasks.add("todo", () => printTasks({ status: "todo" }));
	tasks.add("in-progress", () => printTasks({ status: "in-progress" }));
	tasks.add("done", () => printTasks({ status: "done" }));

	tasks.default(() => {
		console.log(
			createMessage(
				`Unknown status: ${status}. Expected: 'todo', 'in-progress', 'done'.`,
			),
		);
	});

	tasks.match(status);
};
