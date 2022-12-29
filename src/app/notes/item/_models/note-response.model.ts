export interface INoteResponse {
    _id: string;
    title: string;
    body: string;
    dateCreated: Date;
    dateModified: Date;
    isComplete: boolean;
    isPinned: boolean;
    isArchived: boolean;
}