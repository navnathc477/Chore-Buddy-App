import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showAssignedTasks, setShowAssignedTasks] = useState(false);

  useEffect(() => {
    axios.get('/api/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const addTask = () => {
    if (newTask) {
      axios.post('/api/tasks', { name: newTask })
        .then(response => {
          setTasks([...tasks, response.data]);
          setNewTask('');
        })
        .catch(error => console.log(error));
    }
  };

  const assignTask = (id) => {
    axios.put(`/api/tasks/assign/${id}`)
      .then(response => {
        setTasks(tasks.map(task => 
          task.id === id ? { ...task, assigned: true } : task
        ));
      })
      .catch(error => console.log(error));
  };

  const deleteTask = (id) => {
    axios.delete(`/api/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => console.log(error));
  };

  const filteredTasks = showAssignedTasks
    ? tasks.filter(task => task.assigned)
    : tasks;

  return (
    <div className="App">
      <h1>Task Assigner</h1>
      <input 
        type="text" 
        value={newTask} 
        onChange={(e) => setNewTask(e.target.value)} 
        placeholder="Enter task name" 
      />
      <button onClick={addTask}>Add Task</button>
      <label>
        <input 
          type="checkbox" 
          checked={showAssignedTasks} 
          onChange={() => setShowAssignedTasks(!showAssignedTasks)} 
        />
        Show Assigned Tasks
      </label>
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>
            {task.name} {task.assigned && "(Assigned)"}
            {!task.assigned && (
              <button onClick={() => assignTask(task.id)}>Assign</button>
            )}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
