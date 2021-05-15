// const uuid = require('uuid');
const { v4: uuidv4 } = require('uuid');

class Task {
  constructor({
    // id = uuid(),
    id = uuidv4(),
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

  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
