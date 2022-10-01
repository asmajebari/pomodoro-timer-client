export interface Task{
    id: number;
    name: string;
    completed: boolean;
    notes?: string;
    estimated: number;
    done: number;

}