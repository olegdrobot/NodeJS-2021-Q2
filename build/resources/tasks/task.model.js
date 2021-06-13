import * as uuid from 'uuid';
/** Class representing a Task */
class Task {
    constructor({ id = uuid.v4(), title = 'string', order = 0, description = 'string', userId = 'string', boardId = 'string', columnId = 'string', } = {}) {
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
    static toResponse(task) {
        const { id, title, order, description, userId, boardId, columnId } = task;
        return { id, title, order, description, userId, boardId, columnId };
    }
}
export default Task;
