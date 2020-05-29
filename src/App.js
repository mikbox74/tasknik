import React from 'react';
import './App.css';
import TodoList from './Todo/TodoList';
import TodoForm from './Todo/TodoForm';
import ProjectForm from './Project/ProjectForm';
import Context from './context';
import Sec2time from './Helpers/Sec2time';
import ChangeFav from './Helpers/ChangeFav';
import Modal from './Modal/Modal';
import packageJson from '../package.json';

function App() {
  const [todos, setTodos] = React.useState([
    // {id: 1, projectId: 1, title: 'Купить хлеб', completed: true, duration: 0, money: 0, minuteCost: 0, tmpDuration: 0},
  ]);

  const [projects, setProjects] = React.useState([
    // {id: 1, title: 'Проект', tariff: 800},
  ]);

  const [totalTime, setTotalTime] = React.useState(0);
  const [currentId, setCurrentId] = React.useState(0);
  const [timer, setTimer] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    let storageTodos = localStorage.getItem('todos');
    storageTodos && setTodos(JSON.parse(storageTodos));

    let storageProjects = localStorage.getItem('projects');
    storageProjects && setProjects(JSON.parse(storageProjects));

    let storageTotalTime = localStorage.getItem('totalTime');
    storageTotalTime && setTotalTime(storageTotalTime);
  
  }, []);

  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos]);

  React.useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects))
  }, [projects]);

  React.useEffect(() => {
    localStorage.setItem('totalTime', totalTime)
  }, [totalTime]);

  React.useEffect(() => {
    console.log(currentId);
    if (!currentId) {
      clearInterval(timer);
      ChangeFav('./favicon.ico');
    } else {
      clearInterval(timer);
      ChangeFav('./favicon-go.ico');
      setTimer(setInterval(() => {
        setTodos(
          todos.map(todo => {
            if (todo.id === currentId) {
              todo.duration++;
              if (!todo.tmpDuration) {
                todo.tmpDuration = 0;
              }
              todo.tmpDuration++;
              if (todo.duration % 60 === 0) {
                todo.money += todo.minuteCost;
              }
              setTotalTime(prevTT => parseInt(prevTT, 10) + 1);
            }
            return todo;
          })
        );
      }, 1000));
    }
  }, [currentId]);

  function toggleTodo(id) {
    console.log('toggleTodo ' + id);
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
          if (todo.completed && (id === currentId)) {
            setCurrentId(0);
          }
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    console.log('removeTodo ' + id);
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function addTodo(title, projectId) {
    console.log('addTodo ' + title);
    projectId = parseInt(projectId, 10);
    let project = projects.find((project) => project.id === projectId);
    setTodos(todos.concat([{
      id: Date.now(),
      projectId,
      title,
      completed: false,
      duration: 0,
      money: 0,
      minuteCost: parseInt(project.tariff, 10)/60,
      tmpDuration: 0
    }]));
  }

  function editTodo(id, title) {
    console.log('editTodo ' + id);
    let todoIndex = todos.findIndex((todo) => todo.id === id);
    console.log(todos[todoIndex].title = title);
    setTodos(todos);
  }

  function addProject(title, tariff) {
    console.log('addProject ' + title);
    setProjects(projects.concat([{
      id: Date.now(),
      title,
      tariff: parseInt(tariff, 10)
    }]));
  }

  function toggleGo(id) {
    console.log('toggleGo ' + id);

    for (let i=0; i < todos.length; i++) {
      if ((todos[i].id === id) && !todos[i].completed) {
        if (id === currentId) {
          setCurrentId(0);
        } else {
          setCurrentId(id);
        }
        break;
      }
    }
  }

  function resetTotalTime() {
    setTotalTime(0);
    setTodos(
      todos.map(todo => {
        todo.tmpDuration = 0;
        return todo;
      })
    );
  }

  let active = todos.filter((todo => !todo.completed))
  let completed = todos.filter((todo => todo.completed))

  let contextData = {
    removeTodo, 
    toggleTodo, 
    addTodo, 
    editTodo, 
    addProject, 
    toggleGo,
    setIsModalOpen
  }

  return (
    <Context.Provider value={contextData}>
      <div className="App">
        <header className="App-header">
          <div>
            <img src="./time-2-32.png" alt="Tasknik"/>&nbsp;
            Tasknik v.{packageJson.version}
          </div>
        </header>
        <div className="App-content">
          <div>
            {active.length? <TodoList title="Активные" todos={active} projects={projects} currentId={currentId} /> : <p>Нет активных задач</p>}
            <h3>Создать</h3>
            <TodoForm projects={projects} />
            <ProjectForm />
            {completed.length? (<TodoList title="Завершенные" todos={completed} projects={projects} currentId={currentId} />) : <p>Нет завершенных задач</p>}
          </div>
        </div>
        <footer className="App-footer">
          <div className="totalTimer" onClick={() => (setIsModalOpen(true))}>
            Всего: {Sec2time(totalTime)} &nbsp;
          </div>
          <span title="Сбросить общий таймер" className="action resetTotalAction" onClick={() => resetTotalTime()}></span>
        </footer>
      </div>
      <Modal isOpen={isModalOpen} todos={todos} projects={projects} />
    </Context.Provider>
  );
}

export default App;