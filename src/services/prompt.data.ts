// questions.ts
import { QuestionCollection } from 'inquirer';

export const projectTypeQuestion: QuestionCollection<{ projectType: string }> =
    [
        {
            type: 'list',
            name: 'projectType',
            message: 'Choose the type of project you want to create:',
            choices: ['Angular', 'Vue.js'],
        },
    ];

export const useVuetifyQuestion: QuestionCollection<{ useVuetify: boolean }> = [
    {
        type: 'confirm',
        name: 'useVuetify',
        message: 'Would you like to add Vuetify to your Vue project?',
        default: false,
    },
];

export const useSonarQubeQuestion: QuestionCollection<{
    useSonarQube: boolean;
}> = [
    {
        type: 'confirm',
        name: 'useSonarQube',
        message: 'Would you like to set up SonarQube?',
        default: false,
    },
];

export const sonarQubeConfigQuestions: QuestionCollection<{
    projectKey: string;
    organization: string;
    loginToken: string;
}> = [
    {
        type: 'input',
        name: 'projectKey',
        message: 'Enter your SonarQube project key:',
        validate: (input) => (input ? true : 'Project key cannot be empty'),
    },
    {
        type: 'input',
        name: 'organization',
        message: 'Enter your SonarQube organization:',
        validate: (input) => (input ? true : 'Organization cannot be empty'),
    },
    {
        type: 'password',
        name: 'loginToken',
        message: 'Enter your SonarQube login token:',
        mask: '*',
        validate: (input) => (input ? true : 'Token cannot be empty'),
    },
];
