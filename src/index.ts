import { add } from "~actions/add";
import { list } from "~actions/list";
import { markDone } from "~actions/mark-done";
import { markInProgress } from "~actions/mark-in-progress";
import { remove } from "~actions/remove";
import { update } from "~actions/update";
import { CommandLine } from "~lib/command-line";

const main = async () => {
	const command = new CommandLine();

	command.command("add <description>", add);

	command.command("list <status>", list);

	command.command("update <id> <description>", update);

	command.command("delete <id>", remove);

	command.command("mark-done <id>", markDone);

	command.command("mark-in-progress <id>", markInProgress);

	command.run();
};

main();
