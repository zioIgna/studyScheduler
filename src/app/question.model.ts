import { difficultyLevel } from './difficultyLevel';

export class Question {
    constructor(
        public text: string,
        public difficulty: difficultyLevel
    ) { }
}