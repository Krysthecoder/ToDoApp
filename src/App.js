import { useState, useEffect } from 'react';
import './App.css';
import TaskCreator from './components/TaskCreator';
import { TaskTable } from './components/TaskTable';
import { VisibilityControl } from './components/VisibilityControl';
import { Container } from './components/Container';

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
      tasksItems.map(t => (t.name === task.name) ? { ...t, done: !t.done } : t)
    )
  }

  useEffect(() => {
    let data = localStorage.getItem('task');
    if (data) {
      setTaskItems(JSON.parse(data))
    }
  }, [])

  const cleanTask = () => {
    setTaskItems(tasksItems.filter(task => !task.done));
    setShowCompletedSection(false)
  }

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(tasksItems))
  }, [tasksItems])

  return (
    <main className="bg-dark vh-100 text-white">

      <Container>
        
        <TaskCreator createNewTask={createNewTask} />
        
        <TaskTable tasks={tasksItems} toggleTask={toggleTask} />
        
        <VisibilityControl
          isChecked={showCompletedSection}
          setShowCompletedSection={(checked) => setShowCompletedSection(checked)}
          cleanTask={cleanTask}
        />
        
        {
          showCompletedSection && (
            <TaskTable tasks={tasksItems} toggleTask={toggleTask} showCompleted={showCompletedSection} />
          )
        }

      </Container>

    </main>
  );
}

export default App;
