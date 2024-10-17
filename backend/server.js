const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// In-memory task data
let tasks = [
  { id: 1, title: "Sample Task", completed: false }
];

// Route to check if the API is running
app.get('/', (req, res) => {
  res.send('To-Do List API is running');
});

// CREATE a new task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  const newTask = {
    id: tasks.length + 1, // Simple ID generation
    title,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// READ all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// UPDATE a task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  
  const task = tasks.find(t => t.id === parseInt(id));
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = title !== undefined ? title : task.title;
  task.completed = completed !== undefined ? completed : task.completed;
  
  res.json(task);
});

// DELETE a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(t => t.id !== parseInt(id));
  res.status(204).send(); // No content
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
