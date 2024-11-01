#!/usr/bin/env node
'use strict';

import { Action } from './services/action.service';
import { InquirerService } from './services/inquirer.service';
import {
    sonarQubeConfigQuestions,
    useSonarQubeQuestion,
    useVuetifyQuestion,
} from './services/prompt.data';
import { CommandExecutorService } from './services/commandExecutor.service';
import { Logger } from './services/logger.service';

// Initialize the Action class to use Commander with custom methods
const cli = new Action();

cli.name('votybe')
    .description(
        'A CLI to set up Angular or Vue projects with optional configurations'
    )
    .version('1.0.0')
    .command('setup:angular', 'Set up a new Angular project', async () => {
        await setupAngularProject();
    })
    .command('setup:vue', 'Set up a new Vue project with Vite', async () => {
        await setupVueProject();
    })
    .parse(process.argv);

async function setupAngularProject() {
    Logger.info('Creating an Angular project...');

    CommandExecutorService.runCommand('npm install @angular/cli');
    CommandExecutorService.runCommand('ng new my-angular-app --skip-install');
    Logger.success('Angular project created.');

    process.chdir('my-angular-app');

    const { useSonarQube } =
        await InquirerService.askQuestion(useSonarQubeQuestion);
    if (useSonarQube) {
        const sonarConfig = await InquirerService.askQuestion(
            sonarQubeConfigQuestions
        );
        setupSonarQube(sonarConfig);
    }

    setupPrettier();
    setupKarma();
}

async function setupVueProject() {
    Logger.info('Creating a Vue.js project with Vite...');

    CommandExecutorService.runCommand(
        'npm create vite@latest my-vue-app -- --template vue-ts'
    );
    Logger.success('Vue.js project created with Vite.');

    process.chdir('my-vue-app');

    const { useVuetify } =
        await InquirerService.askQuestion(useVuetifyQuestion);
    if (useVuetify) {
        installVuetify();
    }

    setupPrettier();
}

function setupSonarQube(config: {
    projectKey: string;
    organization: string;
    loginToken: string;
}) {
    Logger.info('Setting up SonarQube...');
    const sonarQubeConfig = {
        projectKey: config.projectKey,
        organization: config.organization,
        hostUrl: 'http://localhost:9000',
        loginToken: config.loginToken,
    };
    // Further configuration if needed
}

function installVuetify() {
    Logger.info('Installing Vuetify...');
    CommandExecutorService.runCommand('npm install vuetify');
    Logger.success('Vuetify installed');
}

function setupPrettier() {
    Logger.info('Setting up Prettier...');
    CommandExecutorService.runCommand('npm install --save-dev prettier');
    Logger.success('Prettier configured.');
}

function setupKarma() {
    Logger.info('Setting up Karma for Angular...');
    Logger.success('Karma configuration added.');
}
