import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Do something", completedAt: new Date() },
  { id: 2, text: "Do something else", completedAt: new Date() },
];
export class TodosController {
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    const todo = todos.find((t) => t.id === id);

    todo ? res.json(todo) : res.status(404).json({ error: "Todo not found" });
  };

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;

    console.log("RESP", req.body);

    if (!text)
      return res.status(400).json({ error: "Text Property is required" });

    const newTodo = {
      id: todos.length + 1,
      text: text,
      completedAt: new Date(),
    };
    todos.push(newTodo);
    res.json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    const todo = todos.find((t) => t.id === id);
    if (!todo) return res.status(400).json({ error: "Invalid ID not found" });

    const { text, completedAt } = req.body;

    if (!text)
      return res.status(400).json({ error: "Text Property is required" });

    todo.text = text || todo.text;

    (completedAt == null) ? todo.completedAt == null : todo.completedAt = new Date(completedAt || todo.completedAt)


    res.json(todo);
  };


  public deteleTodo  = (req: Request, res: Response) => {
     const id = Number(req.params.id);

    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
    const todo = todos.find((t) => t.id === id);
    if (!todo) return res.status(404).json({ error: "Todo with id not din" });

    todos.splice(todos.indexOf(todo), 1);
    res.json(todo);




  }
}
