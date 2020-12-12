const fs = require('fs');
const fsPromise = require('fs').promises;
class Todos {
  constructor() {
    this.todos = [];
  }

  list() {
    return [...this.todos];
  }

  add(title) {
    let todo = {
      title: title,
      completed: false
    }
    this.todos.push(todo);
  }

  complete(title) {
    if (this.todos.length === 0) {
      throw new Error("You have no TODOs stored. Why don't you add one first?")
    }
    let todoFound = false;
    this.todos.forEach((todo) => {
      if (todo.title === title) {
        todo.completed = true;
        todoFound = true;
        return;
      }
    });
    if (!todoFound) {
      throw new Error(`No TODO was found with the title: "${title}"`);
    }
  }
  saveToFile(callback) {
    let fileContents = 'Title,Completed\n';
    this.todos.forEach(todo => {
      fileContents += `${todo.title},${todo.completed}\n`;
    });
    fs.writeFile('todos.csv', fileContents, callback);
  }
  saveToFilePromise() {
    let fileContents = 'Title,Completed\n';
    this.todos.forEach(todo => {
      fileContents += `${todo.title},${todo.completed}\n`;
    });
    return fsPromise.writeFile('todos.csv', fileContents);
  }
}
module.exports = Todos;
