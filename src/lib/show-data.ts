import Table from "cli-table3";
import kleur from "kleur";
import type { Task } from "~types";

const colors = {
	todo: kleur.red,
	"in-progress": kleur.yellow,
	done: kleur.green,
};

const getTextColor = (status: "todo" | "in-progress" | "done") =>
	colors[status](status);

const formatDate = (date: string) => new Date(date).toLocaleString();

export const createTable = (tasks: Task[]) => {
	const table = new Table({
		head: ["ID", "Description", "Status", "Created At", "Updated At"],
		colWidths: [10, 40, 15, 25, 25],
		colAligns: ["center", "left", "center", "center", "center"],
		style: { head: ["none"] },
	});

	table.push(
		...tasks.map((task) => [
			task.id,
			task.description,
			getTextColor(task.status),
			formatDate(task.createdAt),
			formatDate(task.updatedAt),
		]),
	);

	return table.toString();
};

export const createMessage = (message: string) => {
	const table = new Table({
		head: [message],
		colWidths: [100],
		colAligns: ["center"],
		style: { head: ["none"] },
	});

	return table.toString();
};
