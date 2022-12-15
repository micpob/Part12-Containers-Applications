const express = require('express');
const { Todo } = require('../mongo')
const { setAsync, getAsync } = require('../redis')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  let oldCount = await getAsync('added_todos') || 0
  const newCount = parseInt(oldCount) + 1
  const todosCount = await setAsync('added_todos', newCount)  
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)
  
  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  if (req.todo) {
    res.send(req.todo);
  } else {
    res.sendStatus(405);
  }
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  if (req.todo) {
    console.log('req.todo', req.todo)
    const newTodo = await Todo.updateOne({_id: req.todo._id}, {text: req.body.text, done: req.body.done})
    if (newTodo) {
      res.sendStatus(200)
    } else {
      res.status(404).end()
    }
  } else {
    res.sendStatus(405);
  }
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
