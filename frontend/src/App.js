import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/api/tasks');
    setTasks(res.data);
  };

  const createTask = async (e) => {
    e.preventDefault(); // stops page refresh
    await axios.post('http://localhost:5000/api/tasks', {
      title,
      description
    });
    setTitle('');        // clear form
    setDescription(''); // clear form
    fetchTasks();        // refresh list
  };
const deleteTask = async (id) => {
  await axios.delete(`http://localhost:5000/api/tasks/${id}`);
  fetchTasks(); // refresh list
};
const updateTask = async (id) => {
  await axios.put(`http://localhost:5000/api/tasks/${id}`, {
    title: editTitle,
    description: editDescription
  });
  setEditId(null); // close edit mode
  fetchTasks();    // refresh list
};
  return (
    <div>
      <h1>Todo App</h1>

      {/* CREATE FORM */}
      <form onSubmit={createTask}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {/* TASK LIST */}
{tasks.map((task) => (
  <div key={task._id}>
    {editId === task._id ? (
      // EDIT MODE
      <div>
        <input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <input
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
        />
        <button onClick={() => updateTask(task._id)}>Save</button>
        <button onClick={() => setEditId(null)}>Cancel</button>
      </div>
    ) : (
      // VIEW MODE
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>{task.status}</p>
        <button onClick={() => {
          setEditId(task._id);
          setEditTitle(task.title);
          setEditDescription(task.description);
        }}>Edit</button>
        <button onClick={() => deleteTask(task._id)}>Delete</button>
      </div>
    )}
  </div>
))}
    </div>
  );
}

export default App;