export interface INoteRequest {
    _id: string;
    title: string;
    body: string;
    dateCreated: string;
    dateModified: string;
    isComplete: boolean;
    isPinned: boolean;
    isArchived: boolean;
}