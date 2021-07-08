const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find(user => user.username === username);

  if (!user) {
    return response.status(404).json({
      error: "User doesn't exist."
    });
  }

  request.user = user;

  return next();
}

function verifyUsernameExists(request, response, next) {
  const { username } = request.body;

  const user = users.find(user => user.username === username);

  if (user) {
    return response.status(400).json({
      error: "Username already exists."
    });
  }

  return next();
}

function checksTodoExists(request, response, next) {
  checksExistsUserAccount(request, response, function() {
    const { user } = request;

    const todo = user.todos.find(todo => todo.id === request.params.id);
    console.log("id: ", request.params.id);
    if (!todo) {
      return response.status(404).json({
        error: "Todo's id not found"
      });
    }

    request.todo = todo;

    return next();
  });
}

app.post('/users', verifyUsernameExists, (request, response) => {
  const { username, name } = request.body;

  const user = {
    id: uuidv4(),
    username,
    name,
    todos: []
  }

  users.push(user);

  return response.status(201).json(user);

});

app.get('/todos', checksExistsUserAccount, checksExistsUserAccount, (request, response) => {
  const { user } = request;

  return response.status(200).json(user.todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;
  const { user } = request;

  const todo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  }

  user.todos.push(todo);

  return response.status(201).json(todo);
});

app.put('/todos/:id', checksTodoExists, (request, response) => {
  const { title, deadline } = request.body;
  const { todo, user } = request;

  user.todos.splice(user.todos.indexOf(todo));

  todo.title = title;
  todo.deadline = new Date(deadline);

  user.todos.push(todo);

  return response.status(200).json(todo);
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const { user } = request;

  const todo = user.todos.find(todo => todo.id === request.params.id);

  if (!todo) {
    return response.status(404).json({
      error: "Id not found."
    });
  }
  
  user.todos.splice(user.todos.indexOf(todo));

  todo.done = true;

  user.todos.push(todo);

  return response.status(200).json(todo);
});

app.delete('/todos/:id', checksTodoExists, (request, response) => {
  const { user, todo } = request;
  
  user.todos.splice(user.todos.indexOf(todo), 1);

  return response.status(204).send();
});

module.exports = app;