export interface TaskProps extends TaskEditableProps {
  id: number | null;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
}

export interface TaskEditableProps {
  title: string;
  description?: string;
  isCompleted: boolean;
}

export interface TaskState {
  isTitleChanged: boolean;
  isDescriptionChanged: boolean;
  isCompletedChanged: boolean;
  isDueDateChanged: boolean;
  isUpdatedAtChanged: boolean;
}
