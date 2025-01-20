import minimist from "minimist";

type CommandResult = {
	[key: string]: string | undefined;
};

type CommandHandler = (args: CommandResult) => void;

export class CommandLine {
	private commands: { pattern: string; handler: CommandHandler }[] = [];

	constructor() {
		this.run();
	}

	command = (pattern: string, handler: CommandHandler) => {
		this.commands.push({ pattern, handler });
		return this;
	};

	run = () => {
		const args = minimist(process.argv.slice(2));

		const matchingCommand = this.commands.find((cmd) => {
			const command = cmd.pattern.split(" ")[0];
			return args._[0] === command;
		});

		if (!matchingCommand) return;
		const result = this.parseArgs(matchingCommand.pattern, args);
		matchingCommand.handler(result);
	};

	private parseArgs = (
		pattern: string,
		args: minimist.ParsedArgs,
	): CommandResult => {
		const requiredArgs = pattern.split(" ").slice(1);
		const result: CommandResult = {};

		for (const [index, arg] of requiredArgs.entries()) {
			const argName = arg.replace(/[<>?]/g, "");
			const value = args[argName] || args._[index + 1];
			result[argName] = value;
		}

		return result;
	};
}
