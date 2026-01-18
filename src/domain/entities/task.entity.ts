import { TaskEditableProps, TaskProps, TaskState } from '../types/task-props';

export class Task implements TaskProps, TaskState {
  private _id: number | null;
  private _title: string;
  private _description?: string;
  private _isCompleted: boolean;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _dueDate?: Date;

  private _isTitleChanged: boolean = false;
  private _isDescriptionChanged: boolean = false;
  private _isCompletedChanged: boolean = false;
  private _isDueDateChanged: boolean = false;
  private _isUpdatedAtChanged: boolean = false;

  get id() {
    return this._id;
  }
  get title() {
    return this._title;
  }
  get description() {
    return this._description;
  }
  get isCompleted() {
    return this._isCompleted;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }
  get dueDate() {
    return this._dueDate;
  }

  get isTitleChanged() {
    return this._isTitleChanged;
  }
  get isDescriptionChanged() {
    return this._isDescriptionChanged;
  }
  get isCompletedChanged() {
    return this._isCompletedChanged;
  }
  get isDueDateChanged() {
    return this._isDueDateChanged;
  }
  get isUpdatedAtChanged() {
    return this._isUpdatedAtChanged;
  }

  private constructor(props: TaskProps) {
    const { id, title, description, isCompleted, createdAt, updatedAt, dueDate } = props;

    this._id = id;
    this._title = title;
    this._description = description;
    this._isCompleted = isCompleted;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._dueDate = dueDate;
  }

  static create(props: TaskEditableProps) {
    const { title, description, isCompleted } = props;

    return new Task({
      id: null,
      title,
      description,
      isCompleted: isCompleted ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: isCompleted ? new Date() : undefined,
    });
  }

  static restore(props: TaskProps) {
    const { id, title, description, isCompleted, createdAt, updatedAt, dueDate } = props;

    return new Task({
      id,
      title,
      description,
      isCompleted,
      createdAt,
      updatedAt,
      dueDate,
    });
  }

  update(props: TaskEditableProps) {
    const { title, description, isCompleted } = props;

    if (title && title !== this.title) {
      this.title = title;
      this._isTitleChanged = true;
    }

    if (description && description !== this.description) {
      this.description = description;
      this._isDescriptionChanged = true;
    }

    if (isCompleted !== undefined && isCompleted !== this.isCompleted) {
      this.isCompleted = isCompleted;
      this._isCompletedChanged = true;

      this._dueDate = isCompleted ? new Date() : undefined;
      this._isDueDateChanged = true;
    }
  }

  set title(title: string) {
    this._title = title;
    this._isTitleChanged = true;

    this._updatedAt = new Date();
    this._isUpdatedAtChanged = true;
  }
  set description(description: string | undefined) {
    this._description = description;
    this._isDescriptionChanged = true;

    this._updatedAt = new Date();
    this._isUpdatedAtChanged = true;
  }
  set isCompleted(isCompleted: boolean) {
    this._isCompleted = isCompleted;
    this._isCompletedChanged = true;

    this._updatedAt = new Date();
    this._isUpdatedAtChanged = true;
  }
}

export default Task;
