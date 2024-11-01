import { execSync } from 'child_process';
import { Logger } from './logger.service';

export class CommandExecutorService {
    static runCommand(
        command: string,
        options: { stdio: 'inherit' | 'pipe' } = { stdio: 'inherit' }
    ): string | void {
        try {
            const result = execSync(command, options);
            return result ? result.toString().trim() : '';
        } catch (error) {
            Logger.error(`Error executing command: ${command}`);
            throw error;
        }
    }
}
