import { RequestHandler } from "express"
import { Todo } from "../models/Todo"

interface TodoTypes {
  id: string
  title: string
  done: boolean
}

export const all: RequestHandler = async (req, res) => {
  const todoList = await Todo.findAll()

  if (!todoList) {
    res.status(200).json({
      error: true,
      msg: "Nenhumas tarefa cadastrada",
    })
  }

  res.status(200).json({
    error: false,
    data: todoList,
  })
}

export const add: RequestHandler = async (req, res) => {
  const { title, done } = req.body

  if (!title) {
    res.status(200).json({
      error: true,
      msg: "O título da tarefa é obrigatório.",
    })
  }

  const newTask = await Todo.create({
    title,
    done: done ? true : false,
  })

  res.status(201).json({
    error: false,
    data: newTask,
  })
}

export const update: RequestHandler = async (req, res) => {
  const { title, done } = req.body
  const { id } = req.params

  if (!req.body) {
    res.status(200).json({
      error: true,
      msg: "Nenhum dado enviado.",
    })
  }

  let task = await Todo.findByPk(id)

  if (!task) {
    res.status(200).json({
      error: true,
      msg: "Tarefa não encontrada.",
    })
  } else {
    if (title) {
      task.title = title
    }
    if (done) {
      switch (done) {
        case "true":
        case "1":
          task.done = true
          break
        case "false":
        case "0":
          task.done = false
          break
      }
    }
    await task.save()
    res.status(201).json({
      error: false,
      data: task,
    })
  }
}

export const remove: RequestHandler = async (req, res) => {
  const { id } = req.params

  let task = await Todo.findByPk(id)

  if (!task) {
    res.status(200).json({
      error: true,
      msg: "Tarefa não encontrada",
    })
  }

  task?.destroy()

  res.status(200).json({
    error: false,
    msg: "Tarefa apagada com sucesso.",
  })
}
