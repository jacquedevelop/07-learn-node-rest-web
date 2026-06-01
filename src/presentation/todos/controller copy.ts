import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";
import { todo } from "node:test";
import { error } from "node:console";

/*const todos = [
  { id: 1, text: "Do something", completedAt: new Date() },
  { id: 2, text: "Do something else", completedAt: new Date() },
];*/

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    /*const getTodo = await prisma.todo.findMany();
    return res.json(getTodo);*/

    const todos = await this.todoRepository.getAll();
    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    /*if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

  

    const todo = await prisma.todo.findFirst({
      where: { id },
    });

    todo ? res.json(todo) : res.status(404).json({ error: "Todo not found" });*/

    try {
      const todo = await this.todoRepository.findById(id);
      res.json(todo);
    } catch (error) {
      res.status(404).json({ error });
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error || !createTodoDto) return res.status(400).json({ error });

    /*const todo = await prisma.todo.create({
      data: {
        text: createTodoDto.text,
      },
    });*

    /*const newTodo = {
      id: todos.length + 1,
      text: text,
      completedAt: new Date(),
    };
    todos.push(newTodo);*/

    const todo = await this.todoRepository.create(createTodoDto);
    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if (error || !updateTodoDto) return res.status(400).json({ error });

    /* const todo = await prisma.todo.findFirst({
      where: { id },
    });

    if (!todo) return res.status(404).json({ error: "Invalid ID not found" });

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: updateTodoDto.values,
    });*/
    const updatedTodo = await this.todoRepository.updateById(updateTodoDto);

    res.json(updatedTodo);
  };

  public deteleTodo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    /*if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
    const todo = await prisma.todo.findFirst({
      where: { id },
    });
    if (!todo) return res.status(404).json({ error: "Todo with id not din" });

    const deleted = await prisma.todo.delete({
      where: { id },
    });

    deleted ? res.json(deleted) : res.status(400).json({ error: "Not found" });*/

    const deletedTodo = await this.todoRepository.deleteById(id);
    res.json(deletedTodo);
  };
}
