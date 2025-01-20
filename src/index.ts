import { add } from "~actions/add";
import { list } from "~actions/list";
import { remove } from "~actions/remove";
import { update } from "~actions/update";
import { CommandLine } from "~lib/command-line";

const main = async () => {
	const command = new CommandLine();

	command.command("add <description>", add);

	command.command("list <status>", list);

	command.command("update <id> <description>", update);

	command.command("delete <id>", remove);

	command.run();
};

main();
