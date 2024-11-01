import { Command } from "commander";

export interface CommandService {
    name(name: string): CommandService;
    description(description: string): CommandService;
    version(version: string): CommandService;
    command(name: string, description: string, action: () => void): CommandService;
    parse(argv: string[]): void;
}

export class Action implements CommandService {
    private program: Command;

    constructor() {
        this.program = new Command();
    }

    name(name: string): CommandService {
        this.program.name(name);
        return this;
    }

    description(description: string): CommandService {
        this.program.description(description);
        return this;
    }

    version(version: string): CommandService {
        this.program.version(version);
        return this;
    }

    command(name: string, description: string, action: () => void): CommandService {
        this.program
            .command(name)
            .description(description)
            .action(action);
        return this;
    }

    parse(argv: string[]): void {
        this.program.parse(argv);
    }
}
