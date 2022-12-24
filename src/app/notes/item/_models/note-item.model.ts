export interface NoteItem {
    id: string;
    title: string;
    body: string;
    dateCreated: Date;
    dateModified: Date;
    isComplete: boolean;
    isPinned: boolean;
}