const express = require('express');
const { getAsync } = require('../redis')
const router = express.Router();

/* GET todos count. */

router.get('/', async (_, res) => {
  const todosCount = await getAsync('added_todos')
  const resultObject = todosCount !== null ? {"added_todos": parseInt(todosCount) } : {"added_todos": 0 }
  res.send(resultObject);
});

module.exports = router;
