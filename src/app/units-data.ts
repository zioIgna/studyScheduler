import { Scadenza } from './scadenza.model';

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
}
