import { useState, useEffect } from 'react';
import './App.css';
import TaskCreator from './components/TaskCreator';
import { TaskTable } from './components/TaskTable';

function App() {

  const [tasksItems, setTaskItems] = useState([])
  const [showCompletedSection, setShowCompletedSection] = useState(false)

  function createNewTask(taskName) {
    if (!tasksItems.find(task => task.name === taskName)) {
      setTaskItems([...tasksItems, { name: taskName, done: false }])
    }

  }

  const toggleTask = task => {
    setTaskItems(
      tasksItems.map(t => (t.name == task.name) ? { ...t, done: !t.done } : t)
    )
  }

  useEffect(() => {
    let data = localStorage.getItem('task');
    if (data) {
      setTaskItems(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(tasksItems))
  }, [tasksItems])

  return (
    <div className="App">

      <TaskCreator createNewTask={createNewTask} />

      <TaskTable tasks={tasksItems} toggleTask={toggleTask} />

      <div>
        <input type='checkbox' onChange={e => setShowCompletedSection(!showCompletedSection)} /> <label>Show Task Done</label>
      </div>

      {
        showCompletedSection && (
          <TaskTable tasks={tasksItems} toggleTask={toggleTask} showCompleted={showCompletedSection} />
        )
      }

    </div>
  );
}

export default App;
