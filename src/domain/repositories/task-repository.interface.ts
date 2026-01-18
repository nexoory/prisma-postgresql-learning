import Task from '../entities/task.entity';

export interface ITaskRepository {
  getAll(): Promise<Task[]>;
  getById(id: number): Promise<Task | null>;
}
