export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
    id : string;
    title:string;
    description? : string;
    priority: Priority;
    tags? : string[];
    isFavorite : boolean;
    cretedAt: Date;
    updatedAt: Date;
}

