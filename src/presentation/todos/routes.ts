import { Router } from "express";
import { TodosController } from "./controller";
import { TodoRepositoryImpl } from "../../infraestructure/repositories/todo.respository.impl";
import { TodoDatasourceImpl } from "../../infraestructure/datasource/todo.datasource.impl";

export class TodosRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new TodoDatasourceImpl();
    const todoController = new TodosController(datasource);

    router.get("/", todoController.getTodos);
    router.get("/:id", todoController.getTodoById);
    router.post("/", todoController.createTodo);
    router.put("/:id", todoController.updateTodo);
    router.delete("/:id", todoController.deleteTodo);

    return router;
  }
}
