export interface Task{
    _id?: string;
    name: string;
    completed: boolean;
    notes?: string;
    estimated: number;
    done: number;

}