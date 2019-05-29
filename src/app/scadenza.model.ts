import { DeadlineStatus } from './deadlineStatus.model';

export class Scadenza {
    constructor(
        public giorno: Date,
        public status: DeadlineStatus
    ) { }
}