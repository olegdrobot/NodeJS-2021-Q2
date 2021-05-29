"use strict";
exports.__esModule = true;
var uuid_1 = require("uuid");
/** Class representing a Task */
var Task = /** @class */ (function () {
    function Task(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.id, id = _c === void 0 ? uuid_1.uuidv4() : _c, _d = _b.title, title = _d === void 0 ? 'string' : _d, _e = _b.order, order = _e === void 0 ? 0 : _e, _f = _b.description, description = _f === void 0 ? 'string' : _f, _g = _b.userId, userId = _g === void 0 ? 'string' : _g, _h = _b.boardId, boardId = _h === void 0 ? 'string' : _h, _j = _b.columnId, columnId = _j === void 0 ? 'string' : _j;
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
    Task.toResponse = function (task) {
        var id = task.id, title = task.title, order = task.order, description = task.description, userId = task.userId, boardId = task.boardId, columnId = task.columnId;
        return { id: id, title: title, order: order, description: description, userId: userId, boardId: boardId, columnId: columnId };
    };
    return Task;
}());
exports["default"] = Task;
