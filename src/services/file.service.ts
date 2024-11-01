import fs from 'fs';
import path from 'path';

export class FileService {
    static readJsonFile(filePath: string): any {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    static writeJsonFile(filePath: string, data: any): void {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }

    static copyFile(source: string, destination: string): void {
        fs.copyFileSync(source, destination);
    }

    static writeCopyFile(
        filePath: string,
        config: Record<string, string>
    ): void {
        const content = Object.entries(config)
            .map(([key, value]) => `${key}=${value}`)
            .join('\n');
        fs.writeFileSync(filePath, content);
    }

    static joinPath(...segments: string[]): string {
        return path.join(...segments);
    }

    // New method to read a file as a string
    static readFile(filePath: string): string {
        return fs.readFileSync(filePath, 'utf8');
    }

    // New method to write a string to a file
    static writeFile(filePath: string, data: string): void {
        fs.writeFileSync(filePath, data, 'utf8');
    }
}
