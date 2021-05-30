import * as uuid from 'uuid';

/** Class representing a Task */


class Task {

/**
  * Create a Task
  * @param (string) id - ID of Task
  * @param (string) title - The title of the Task
  * @param (number) order - The tasks order
  * @param (string) description - It's Tasks description
  * @param (string) userId - ID of User
  * @param (string) boardId - ID of Board
  * @param (string) columnId - ID of column
*/

    
    title: string;
    order: number;
    description: string;
    userId: string | undefined;
    boardId: string;
    columnId: string | undefined;
    id?: string;

  constructor({
    id = uuid.v4(),
    title = 'string',
    order = 0,
    description = 'string',
    userId =  'string',
    boardId = 'string',
    columnId = 'string',
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;

  }

   /**
    * Return Task object
    * @param (class) task - Class Tasks instance   
    * @return (object) 
  */

  static toResponse(task: any) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

export default Task;

