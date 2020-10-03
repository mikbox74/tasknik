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

const styles = {
  button: {
    cursor: 'pointer',
    background: '#e91615',
    color: '#fff',
    border: 0,
    height: '1.5rem'
  },
  buttons: {
    padding:0,
    marginLeft: "auto",
    alignItems: "center"
  },
  button2: {
    marginLeft: ".5rem",
    background: '#29f605'
  }
}

const appTitle = document.title 
const appSigns = ["[▶]", "[◀]"]
let appSignKey = 0

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
      document.title = appTitle;
    } else {
      clearInterval(timer);
      ChangeFav('./favicon-go.ico');
      setTimer(setInterval(() => {
        document.title = appSigns[appSignKey] + " " + appTitle;
        appSignKey = (appSignKey+1)%2
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

  function exportData() {
    let blob = JSON.stringify({
      totalTime: localStorage.getItem('totalTime'),
      todos: localStorage.getItem('todos'),
      projects: localStorage.getItem('projects'),
    })
    let name = "tasknik.json"
    if (typeof navigator.msSaveBlob == "function") {
      return navigator.msSaveBlob(blob, name)
    }

    let saver = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    let blobURL = URL.createObjectURL(new Blob([blob], {type: "application/json"}))

    saver.href = blobURL
    saver.download = name
    saver.dispatchEvent(new MouseEvent("click"))
    URL.revokeObjectURL(blobURL)
    saver = null
  }

  function importData() {
    if (window.confirm("Все задачи, проекты и таймеры будут перезаписаны. Продолжить?")) {
      setCurrentId(0)
      let selector = document.createElementNS("http://www.w3.org/1999/xhtml", "input")
      selector.type = "file"
      selector.accept = "application/json"
      selector.addEventListener("change", () => {
        if (selector.files && selector.files[0]) {
          let file = selector.files[0]
          let reader = new FileReader()
          reader.addEventListener('load', function (e) {
            try {
              let result = JSON.parse(e.target.result)
              localStorage.setItem('totalTime', result.totalTime)
              localStorage.setItem('todos', result.todos)
              localStorage.setItem('projects', result.projects)
              window.location.reload()
            } catch (e) {
              window.alert("Не удалось прочитать файл")
            }
          })
          reader.readAsText(file)
        }
        selector = null
      })
      selector.dispatchEvent(new MouseEvent("click"))
    }
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
            <div style={{padding:0}}>
              <img src="./time-2-32.png" alt="Tasknik"/>&nbsp;
              Tasknik v.{packageJson.version}
            </div>
            <div style={styles.buttons}>
              <button 
                style={styles.button} 
                onClick={() => (importData())}
                type="button">Импорт</button>
              <button 
                style={{...styles.button, ...styles.button2}} 
                onClick={() => (exportData())}
                type="button">Экспорт</button>
            </div>
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