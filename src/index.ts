#!/usr/bin/env node
"use strict";
import { Command } from "commander";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const program = new Command();

program
    .name("votybe")
    .description("CLI to setup Angular")
    .version("1.0.0");


program
    .command("install-angular")
    .description("Installs Angular, sets up SonarQube, Karma, and Prettier configurations")
    .action(() => {
        console.log("Installing Angular...");

        try {
            // Install Angular CLI globally
            execSync("npm install -g @angular/cli", { stdio: "inherit" });
            execSync("ng new my-angular-app --skip-install", { stdio: "inherit" });
            console.log("Angular setup complete.");

            // Change directory to Angular app
            process.chdir("my-angular-app");

            console.log("Setting up SonarQube...");

            // SonarQube configuration as an object
            const sonarQubeConfig = {
                "sonar.projectKey": "my-angular-app",
                "sonar.organization": "my-org",
                "sonar.host.url": "https://sonarcloud.io",
                "sonar.login": "my-token"
            };

            // Write SonarQube configuration to file
            const sonarConfigContent = Object.entries(sonarQubeConfig)
                .map(([key, value]) => `${key}=${value}`)
                .join('\n');
            fs.writeFileSync("sonar-project.properties", sonarConfigContent);
            console.log("SonarQube configuration file added.");

            // Add sonar-scanner as a devDependency and set up sonar:scan script
            const packageJsonPath = path.join(process.cwd(), "package.json");
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

            // Get the latest version of sonar-scanner from npm registry
            const latestVersion = execSync("npm show sonar-scanner version").toString().trim();

            // Add sonar-scanner to devDependencies with the latest version
            packageJson.devDependencies = packageJson.devDependencies || {};
            packageJson.devDependencies["sonar-scanner"] = `^${latestVersion}`;

            // Add sonar:scan script using sonar.settings=sonar-project.properties
            packageJson.scripts["sonar:scan"] = "sonar-scanner -Dsonar.settings=sonar-project.properties";

            // Write the modified package.json back to disk
            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
            console.log("SonarQube Scanner added to devDependencies with version ${latestVersion}");

            // Setting up Karma configuration
            console.log("Setting up Karma configuration...");

            // Copy karma.config.template.js to my-angular-app/karma.conf.js
            const karmaTemplatePath = path.join(__dirname, "karma.config.template.js");
            const karmaConfigPath = path.join(process.cwd(), "karma.conf.js");
            fs.copyFileSync(karmaTemplatePath, karmaConfigPath);
            console.log("Karma configuration file added.");

            // Update angular.json to include karmaConfig path
            const angularJsonPath = path.join(process.cwd(), "angular.json");
            const angularJson = JSON.parse(fs.readFileSync(angularJsonPath, "utf8"));
            angularJson.projects["my-angular-app"].architect.test.options.karmaConfig = "karma.conf.js";
            fs.writeFileSync(angularJsonPath, JSON.stringify(angularJson, null, 2));
            console.log("Karma configuration path added to angular.json");

            // Setting up Prettier
            console.log("Setting up Prettier...");

            // Install Prettier
            execSync("npm install --save-dev prettier", { stdio: "inherit" });

            // Create .prettierrc configuration file
            const prettierConfig = {
                "semi": true,
                "singleQuote": true,
                "printWidth": 80,
                "tabWidth": 4,
                "trailingComma": "es5",
                "bracketSpacing": true,
                "arrowParens": "always"
            };
            fs.writeFileSync(".prettierrc", JSON.stringify(prettierConfig, null, 2));
            console.log("Prettier configuration file (.prettierrc) added.");

            // Update package.json to include Prettier format script
            packageJson.scripts["format"] = "prettier --write \"src/**/*.{ts,js,json,css,scss,html}\"";
            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
            console.log("Prettier format script added to package.json");

        } catch (error) {
            console.error("Error during installation and setup:", error);
        }
    });

program.parse(process.argv);
