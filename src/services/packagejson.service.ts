import { FileService } from './file.service';

export class PackageJsonService {
    static readPackageJson(): any {
        const packageJsonPath = this.getPackageJsonPath();
        return FileService.readJsonFile(packageJsonPath);
    }

    static writePackageJson(data: any): void {
        const packageJsonPath = this.getPackageJsonPath();
        FileService.writeJsonFile(packageJsonPath, data);
    }

    static addDependency(packageName: string, version: string): void {
        const packageJson = this.readPackageJson();
        packageJson.dependencies = packageJson.dependencies || {};
        packageJson.dependencies[packageName] = version;
        this.writePackageJson(packageJson);
    }

    static addDevDependency(packageName: string, version: string): void {
        const packageJson = this.readPackageJson();
        packageJson.devDependencies = packageJson.devDependencies || {};
        packageJson.devDependencies[packageName] = version;
        this.writePackageJson(packageJson);
    }

    static addScript(scriptName: string, command: string): void {
        const packageJson = this.readPackageJson();
        packageJson.scripts = packageJson.scripts || {};
        packageJson.scripts[scriptName] = command;
        this.writePackageJson(packageJson);
    }

    private static getPackageJsonPath(): string {
        return FileService.joinPath(process.cwd(), 'package.json');
    }
}
