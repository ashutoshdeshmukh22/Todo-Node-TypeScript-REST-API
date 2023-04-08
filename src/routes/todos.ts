// import express from 'express';
// const router = express.Router();

import { Router } from 'express';
import { ToDo } from '../models/todos';
const router = Router();

type RequestBody = { text: string };
type RequestParams = { todoId: string };

let toDos: ToDo[] = [];

// VIEW ALL ToDos
router.get('/', (req, res, next) => {
  res.status(200).json({ toDos: toDos });
});

// ADD A Todo
router.post('/todo', (req, res, next) => {
  const body = req.body as RequestBody;
  const newTodo: ToDo = {
    id: Math.floor(Math.random() * 10000000).toString(),
    text: body.text,
  };
  toDos.push(newTodo);

  res.status(201).json({ message: 'Added Todo', todo: newTodo, toDos: toDos });
});

// UPDATE A Todo
router.put('/todo/:todoId', (req, res, next) => {
  const body = req.body as RequestBody;
  const params = req.params as RequestParams;
  const tid = params.todoId;
  const todoIndex = toDos.findIndex((toDoItem) => toDoItem.id === tid);
  if (todoIndex >= 0) {
    toDos[todoIndex] = { id: toDos[todoIndex].id, text: body.text };
    return res.status(200).json({ message: 'Updated ToDo', toDos: toDos });
  }
  res.status(404).json({ message: 'Could Not Find ToDo for this Id' });
});

// DELETE A Todo
router.delete('/todo/:todoId', (req, res, next) => {
  const params = req.params as RequestParams;
  toDos = toDos.filter((toDoItem) => toDoItem.id !== params.todoId);
  res.status(200).json({ message: 'Deleted Todo', toDos: toDos });
});

export default router;
