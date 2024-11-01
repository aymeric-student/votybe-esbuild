import inquirer, { QuestionCollection } from 'inquirer';

export class InquirerService {
    static async askQuestion<T>(questions: QuestionCollection<T>): Promise<T> {
        return inquirer.prompt(questions);
    }
}
