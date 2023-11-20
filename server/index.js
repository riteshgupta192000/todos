













































const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT =5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todoapp', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

// Todo model
const Todo = mongoose.model('Todo', {
    title: String,
    link: String,
    position: Number,
    checked: Boolean,
});

// Routes
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find().sort({ position: 1 });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/todos/add', async (req, res) => {
    try {
        const { title, link, position } = req.body;
        const todo = new Todo({ title, link, position, checked: false });
        await todo.save();
        res.json('Todo added!');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/todos/update', async (req, res) => {
    try {
        const { id, checked } = req.body;
        await Todo.findByIdAndUpdate(id, { checked });
        res.json('Todo updated!');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});







