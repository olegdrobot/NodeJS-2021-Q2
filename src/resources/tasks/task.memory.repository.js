"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.delTaskUser = exports.delBoardsTask = exports.del = exports.update = exports.getByID = exports.create = exports.getAll = void 0;
var task_model_1 = require("./task.model");
var tasksDB = [];
/**
 * This function return all Tasks from the database
 * @return (array) tasksDB - It's array of Tasks objects
*/
var getAll = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, tasksDB];
}); }); };
exports.getAll = getAll;
/**
 * This function create a new Task
 * @param (object) data - It's created Task
 * @return (object) newTask - It's Task which will be created and add to the database
*/
var create = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var newTask;
    return __generator(this, function (_a) {
        newTask = new task_model_1["default"](data);
        tasksDB.push(newTask);
        return [2 /*return*/, newTask];
    });
}); };
exports.create = create;
/**
 * This function return 'Task' of the Board  from database using Tasks ID and Board ID
 * @param (string) boardId - It's Boards id, which contain the Task
 * @param (string) taskId - It's Tasks id, which will be returned
 * @return (object) task[0]
*/
var getByID = function (boardId, taskId) { return __awaiter(void 0, void 0, void 0, function () {
    var task;
    return __generator(this, function (_a) {
        task = tasksDB.filter(function (el) { return (el.boardId === boardId && el.id === taskId); });
        return [2 /*return*/, task[0]];
    });
}); };
exports.getByID = getByID;
/**
 * This function is update Tasks data of the Board in the database using Tasks ID and Board ID
 * @param (object) data - It's an object which contain a new data
 * @param (string) taskId - It's Tasks id, which will be updated
 * @param (string) boardId - It's Boards id, which contain the Task
 * @return (object) updatedTask - It's updated Task
*/
var update = function (boardId, taskId, data) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedTask, i;
    return __generator(this, function (_a) {
        updatedTask = {};
        for (i = 0; i < tasksDB.length; i += 1) {
            if (tasksDB[i].boardId === boardId && tasksDB[i].id === taskId) {
                tasksDB[i].title = data.title;
                tasksDB[i].order = data.order;
                tasksDB[i].description = data.description;
                tasksDB[i].userId = data.userId;
                tasksDB[i].columnId = data.columnId;
                updatedTask = tasksDB[i];
            }
        }
        return [2 /*return*/, updatedTask];
    });
}); };
exports.update = update;
/**
 * This function is delete Task of the Board from the database using Tasks ID and Board ID
 * @param (string) taskId - It's Tasks id, which will be updated
 * @param (string) boardId - It's Boards id, which contain the Task
 * @return (object) updatedTask - It's updated Task
 * @return (boolean) false - If Task was found
*/
var del = function (boardId, taskId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        tasksDB = tasksDB.filter(function (el) {
            if (el.boardId !== boardId || el.id !== taskId)
                return true;
            return false;
        });
        return [2 /*return*/];
    });
}); };
exports.del = del;
/**
 * This function delete Tasks which belonged deleted Board
 * @param (string) id - ID deleted Board
*/
var delBoardsTask = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        tasksDB = tasksDB.filter(function (el) {
            if (el.boardId !== id)
                return true;
            return false;
        });
        return [2 /*return*/];
    });
}); };
exports.delBoardsTask = delBoardsTask;
/**
 * This function assign 'null' to the users ID of Tasks
 * @param (string) id - It's ID of user which was deleted
*/
var delTaskUser = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var i;
    return __generator(this, function (_a) {
        for (i = 0; i < tasksDB.length; i += 1) {
            if (tasksDB[i].userId === id)
                tasksDB[i].userId = null;
        }
        return [2 /*return*/];
    });
}); };
exports.delTaskUser = delTaskUser;
