// infrastructure/database/repositories/prisma-task.repository.ts
import { ITaskRepository } from '@domain/repositories/task-repository.interface';
import { Task } from '@domain/entities/task.entity';
import prisma from '@infrastructure/database/prisma';
import { TaskMapper } from '@infrastructure/database/mappers/task.mapper';

export class PrismaTaskRepository implements ITaskRepository {
  async getById(id: number): Promise<Task | null> {
    const data = await prisma.task.findUnique({ where: { id } });

    return data ? TaskMapper.toDomain(data) : null;
  }

  async getAll() {
    const data = await prisma.task.findMany();

    return data.map(task => TaskMapper.toDomain(task));
  }
}
