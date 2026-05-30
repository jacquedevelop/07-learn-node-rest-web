"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosController = void 0;
const todos = [
    { id: 1, text: "Do something", createdAt: new Date() },
    { id: 2, text: "Do something else", createdAt: new Date() },
];
class TodosController {
    constructor() { }
    getTodos = (req, res) => {
        res.json(todos);
    };
    getTodoById = (req, res) => {
        const id = req.params.id;
        res.json({ id });
    };
}
exports.TodosController = TodosController;
//# sourceMappingURL=controller.js.map