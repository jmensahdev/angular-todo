export interface Todo {
    id: string;
    label: string;
    description: string;
    isComplete: boolean;
    dueDate: string;
    createdAt: Date;
    updatedAt: Date;
}