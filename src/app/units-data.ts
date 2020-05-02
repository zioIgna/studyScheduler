import { Scadenza } from './scadenza.model';
import { Question } from './question.model';

export interface UnitsData {
    appuntamenti: Scadenza[];
    chapterFrom: string;
    chapterTo: string;
    createdOn: string;
    libro: string;
    nextDate: Scadenza;
    overdueDates: boolean;
    title: string;
    today: string;
    notes?: string;
    questions?: Question[];
    isArchived?: boolean
}
