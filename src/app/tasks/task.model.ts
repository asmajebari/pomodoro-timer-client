export class Task{
    public name: string = "";
    public completed: Boolean = false;
    public notes?: string = "";
    public estimated: number = 0;
    public done: number = 0;

    constructor(name: string, completed: Boolean, estimated: number, notes?: string) {
        this.name = name;
        this.completed = completed;
        this.estimated = estimated;
        this.notes = notes;
    }
}