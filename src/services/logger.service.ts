import colors from 'colors';

export class Logger {
    static info(message: string): void {
        console.log(colors.blue(`[INFO] ${message}`));
    }

    static success(message: string): void {
        console.log(colors.green(`[SUCCESS] ${message}`));
    }

    static error(message: string): void {
        console.error(colors.red(`[ERROR] ${message}`));
    }
}
