# node-todos
Api for task management.

## Functional requirements
* [ ] Create an user with a name and a username
* [ ] Create a new todo
* [ ] List all todos
* [ ] Update the title and deadline of an existing todo
* [ ] Mark a todo as done
* [ ] Delete a todo


## Routes
* POST /users
* GET /todos
* POST /todos
* PUT /todos:id
* PATCH /todos/:id/done
* DELETE /todos/:id

## Test specifications
### User tests
* Should be able to create a new user: a JSON must be returned when creating a new user and the status code must be 201.
* Should not be able to create a new user when username already exists: 

### Todos tests
* Should be able to list all user's todos
* Should be able to create a new todo
* Should be able to update a todo
* Should not be able to update a non existing todo
* Should be able to mark a todo as done
* Should not be able to mark a non existing todo as done
* Should be able to delete a todo
* Should not be able to delete a non existing todo

---
:rocket: This code is the resolution of the #1 Challenge - Node.js concepts, part of the course Ignite by [@Rocketseat](https://github.com/Rocketseat)
