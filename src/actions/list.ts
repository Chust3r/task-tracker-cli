import { db } from "~lib/db";
import { MatchCase } from "~lib/match-case";
import type { Task } from "~types";

const printTasks = async (filter?: Partial<Task>) => {
	const data = db.select(filter);

	if (data.length === 0) {
		console.log("No tasks found.");
		return;
	}

	for (const task of data) {
		console.log(JSON.stringify(task, null, 2));
	}
};
export const list = ({ status }: { status?: string }) => {
	if (!status) {
		printTasks();
		return;
	}

	const tasks = new MatchCase();

	tasks.add("todo", () => printTasks({ status: "todo" }));
	tasks.add("in_progress", () => printTasks({ status: "in_progress" }));
	tasks.add("done", () => printTasks({ status: "done" }));

	tasks.default(() => {
		console.warn(
			`Unknown status: ${status}. Expected: 'todo', 'in_progress', 'done'.`,
		);
	});

	tasks.match(status);
};
