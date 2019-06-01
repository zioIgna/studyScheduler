import { Scadenza } from './scadenza.model';

export class Unit {
    constructor(
        public title: string,
        public chapterFrom: string,
        public chapterTo: string,
        public createdOn: Date,
        public appuntamenti: Scadenza[],
    ) { }
}