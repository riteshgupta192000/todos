
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', link: '' });

  useEffect(() => {
    // Fetch todos from the server
    axios.get('http://localhost:5000/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const addTodo = () => {
    // Add new todo to the server
    axios.post('http://localhost:5000/todos/add', { ...newTodo, position: todos.length + 1 })
      .then(() => {
        setTodos([...todos, { ...newTodo, position: todos.length + 1, checked: false }]);
        setNewTodo({ title: '', link: '' });
      })
      .catch(error => console.error('Error adding todo:', error));
  };

  const updateTodo = (id, checked) => {
    // Update todo on the server
    axios.post('http://localhost:5000/todos/update', { id, checked })
      .then(() => {
        setTodos(todos.map(todo => (todo._id === id ? { ...todo, checked } : todo)));
      })
      .catch(error => console.error('Error updating todo:', error));
  };

  return (
    <div className="App">
      <h1>Todo Dashboard</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Link"
          value={newTodo.link}
          onChange={(e) => setNewTodo({ ...newTodo, link: e.target.value })}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo._id} style={{ textDecoration: todo.checked ? 'line-through' : 'none' }}>
            <input
              type="checkbox"
              checked={todo.checked}
              onChange={(e) => updateTodo(todo._id, e.target.checked)}
            />
            {todo.title} - {todo.link}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;























