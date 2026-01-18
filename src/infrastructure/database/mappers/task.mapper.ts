import Task from '@/domain/entities/task.entity';
import { Prisma } from '@prisma/client';

export class TaskMapper {
  static toCreateInput(task: Task): Prisma.TaskCreateInput {
    return {
      title: task.title,
      description: task.description,
      isCompleted: task.isCompleted,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      dueDate: task.dueDate,
    };
  }

  static toUpdateInput(task: Task): Prisma.TaskUpdateInput {
    return {
      title: task.isTitleChanged ? task.title : undefined,
      description: task.isDescriptionChanged ? task.description : undefined,
      isCompleted: task.isCompletedChanged ? task.isCompleted : undefined,
      updatedAt: task.isUpdatedAtChanged ? task.updatedAt : undefined,
      dueDate: task.isDueDateChanged ? task.dueDate : undefined,
    };
  }

  static toDomain(task: Prisma.TaskGetPayload<{}>): Task {
    return Task.restore({
      id: task.id,
      title: task.title,
      description: task.description ?? undefined,
      isCompleted: task.isCompleted,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      dueDate: task.dueDate ?? undefined,
    });
  }
}
