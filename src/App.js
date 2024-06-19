import { useState, useEffect } from 'react';
import './App.css';
import TaskCreator from './components/TaskCreator';
import { jsx } from 'react/jsx-runtime';

function App() {

  const [tasksItems, setTaskItems] = useState([])

  function createNewTask (taskName) {
    if(!tasksItems.find(task => task.name === taskName)){
      setTaskItems([...tasksItems, {name: taskName, done: false}])
    }
    
  }

  useEffect(()=>{
    let data = localStorage.getItem('task');
    if(data){
      setTaskItems(JSON.parse(data))
    }  
  }, [])

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(tasksItems))
  }, [tasksItems])

  return (
    <div className="App">

      <TaskCreator createNewTask={createNewTask}/>

      <table>
        <thead>
          <tr>
            <th>Tasks</th>
          </tr>
        </thead>
        <tbody>
          {
            tasksItems.map( task => <tr key={task.name}><td>{task.name}</td></tr>)
          }
        </tbody>
      </table>



    </div>
  );
}

export default App;
