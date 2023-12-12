/* sophisticatedCode.js */

// Filename: sophisticatedCode.js
// Purpose: This code is a sophisticated implementation of a task management system using JavaScript.
//          It includes advanced functionality such as user authentication, task prioritization, and project management.
//          The code is designed to be scalable and maintainable, with a modular architecture.

// Constants
const MAX_PRIORITY = 10;

// User class
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }
}

// Task class
class Task {
  constructor(name, description, priority) {
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.completed = false;
  }

  complete() {
    this.completed = true;
  }
}

// Project class
class Project {
  constructor(name, description, tasks) {
    this.name = name;
    this.description = description;
    this.tasks = tasks;
  }

  addTask(task) {
    this.tasks.push(task);
  }
}

// TaskManager class
class TaskManager {
  constructor() {
    this.users = [];
    this.projects = [];
  }

  addUser(user) {
    this.users.push(user);
  }

  addProject(project) {
    this.projects.push(project);
  }

  userExists(username) {
    return this.users.some(user => user.username === username);
  }

  authenticateUser(username, password) {
    return this.users.find(user => user.username === username && user.password === password);
  }

  sortByPriority(tasks) {
    return tasks.sort((a, b) => b.priority - a.priority);
  }

  getTasksByPriority() {
    let tasks = [];

    for (const project of this.projects) {
      tasks.push(...project.tasks);
    }

    return this.sortByPriority(tasks);
  }
}

// Usage example
const taskManager = new TaskManager();

// Create users
const user1 = new User("Alice", "pass123");
const user2 = new User("Bob", "pass456");

// Create tasks
const task1 = new Task("Implement authentication", "Implement user authentication using JWT.", 8);
const task2 = new Task("Add project management", "Allow users to create and manage projects.", 5);
const task3 = new Task("Refactor code", "Refactor existing codebase for improved readability.", 7);

// Add tasks to users
user1.addTask(task1);
user2.addTask(task2);
user2.addTask(task3);

// Create projects
const project1 = new Project("Task Manager", "Manage tasks and projects.", [task1, task2]);
const project2 = new Project("Code Refactoring", "Improve code quality and maintainability.", [task3]);

// Add users and projects to task manager
taskManager.addUser(user1);
taskManager.addUser(user2);
taskManager.addProject(project1);
taskManager.addProject(project2);

// Authenticate user
const authenticatedUser = taskManager.authenticateUser("Alice", "pass123");
if (authenticatedUser) {
  console.log(`Authenticated user: ${authenticatedUser.username}`);
  const tasks = taskManager.getTasksByPriority();
  console.log("Tasks by priority:");
  tasks.forEach(task => console.log(`- ${task.name}`));
} else {
  console.log("Authentication failed. Please check your credentials.");
}
