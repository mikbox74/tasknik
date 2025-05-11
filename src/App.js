import React from 'react';
import './App.scss';
import TodoList from './Todo/TodoList';
import TodoForm from './Todo/TodoForm';
import ProjectForm from './Project/ProjectForm';
import Context from './context';
import Sec2time from './Helpers/Sec2time';
import ChangeFav from './Helpers/ChangeFav';
import Modal from './Modal/Modal';
import EditTodoModal from './Todo/EditTodoModal'; // Импорт нового модального окна
import packageJson from '../package.json';
import { XCircle } from 'react-feather';

// Иконки для уведомлений (UTF-8 эмодзи)
const ICON_RUNNING = '👨‍💻'; // Человек за компьютером
const ICON_STOPPED = '🧘'; // Человек отдыхает (медитирует)

const styles = {
  buttons: {
    padding:0,
    marginLeft: "auto",
    alignItems: "center"
  },
  button: {
    cursor: 'pointer',
    color: '#e91615',
    background: 'transparent',
    border: '2px solid',
    borderRadius: '3px',
    height: '1.5rem'
  },
  button2: {
    marginLeft: ".5rem",
    color: '#40a040'
  },
  button3: {
    background: 'transparent',
    // border: '1px solid',
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

  const [selected, setSelected] = React.useState([
    // 1601760513846,
  ]);


  const [totalTime, setTotalTime] = React.useState(0);
  const [currentId, setCurrentId] = React.useState(0);
  const [timer, setTimer] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpenState] = React.useState(false); // Состояние для модального окна редактирования
  const [todoToEdit, setTodoToEdit] = React.useState(null); // Состояние для задачи, которую редактируем

  const [selectedTotalTime, setSelectedTotalTime] = React.useState(0);
  const [selectedTotalAmount, setSelectedTotalAmount] = React.useState(0);
  const [lastStartedTodoId, setLastStartedTodoId] = React.useState(null); // ID последнего ЗАПУЩЕННОГО Todo
  const [notificationPermission, setNotificationPermission] = React.useState(Notification.permission); // Состояние для разрешения уведомлений

  // Запрос разрешения на уведомления при загрузке
  React.useEffect(() => {
    // Запрашиваем разрешение только если оно еще не предоставлено и не отклонено
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        setNotificationPermission(permission); // Обновляем состояние после ответа пользователя
      });
    }
  }, []); // Пустой массив зависимостей, чтобы выполнилось один раз при монтировании

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
      let startAt = Date.now();
      setTimer(setInterval(() => {
        document.title = appSigns[appSignKey] + " " + appTitle;
        appSignKey = (appSignKey+1)%2
        setTodos(
          todos.map(todo => {
            if (todo.id === currentId) {
              todo.durationMs || (todo.durationMs = todo.duration*1000);
              let diff = Date.now() - startAt;
              todo.durationMs += diff;
              startAt = Date.now();
              todo.duration = Math.round(todo.durationMs / 1000);
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
    // eslint-disable-next-line
  }, [currentId]);

  React.useEffect(() => {
    calcSelectedTotals()
    // eslint-disable-next-line
  }, [selected]);

  // Определение toggleTodo
  const toggleTodo = React.useCallback((id) => {
    console.log('toggleTodo ' + id);
    // setLastToggledTodoId(id); // Больше не запоминаем ID здесь
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
  }, [currentId, setCurrentId, setTodos, todos]); // Удалена зависимость setLastToggledTodoId

  // Оборачиваем toggleGo в useCallback и добавляем логику сохранения ID
  // Перемещено ПЕРЕД toggleLastGo
  const toggleGo = React.useCallback((id) => {
    console.log('toggleGo ' + id);

    for (let i = 0; i < todos.length; i++) {
      const todo = todos[i]; // Получаем текущий todo
      if ((todo.id === id) && !todo.completed) {
        const project = projects.find(p => p.id === todo.projectId); // Находим проект
        // Формируем заголовок уведомления. Если проект не найден (маловероятно, но возможно), используем только название задачи
        const notificationTitle = project ? `${project.title}: ${todo.title}` : todo.title;

        if (id === currentId) {
          // --- Остановка таймера ---
          setCurrentId(0);
          // Показываем уведомление, если разрешение получено
          if (notificationPermission === 'granted') {
            try {
              // Используем эмодзи в тексте уведомления, т.к. `icon` может не поддерживаться или плохо отображаться везде
              new Notification(`${ICON_STOPPED} ОСТАНОВЛЕНО: ${notificationTitle}`, {
                body: `Задача остановлена.`,
                silent: true // Без звука
              });
            } catch (error) {
              console.error("Ошибка при показе уведомления (остановка):", error);
            }
          }
        } else {
          // --- Запуск таймера ---
          setLastStartedTodoId(id);
          setCurrentId(id);
          // Показываем уведомление, если разрешение получено
          if (notificationPermission === 'granted') {
            try {
              // Используем эмодзи в тексте уведомления
              new Notification(`${ICON_RUNNING} ЗАПУЩЕНО: ${notificationTitle}`, {
                body: `Задача запущена.`,
                silent: true // Без звука
              });
            } catch (error) {
              console.error("Ошибка при показе уведомления (запуск):", error);
            }
          }
        }
        break; // Выходим из цикла, так как нашли и обработали нужную задачу
      }
    }
    // Обновляем зависимости: добавляем projects и notificationPermission
  }, [currentId, todos, projects, notificationPermission, setCurrentId, setLastStartedTodoId]);

  // Новая функция для переключения последнего ЗАПУЩЕННОГО Todo
  const toggleLastGo = React.useCallback(() => {
    if (lastStartedTodoId === null) {
      console.log('toggleLastGo: lastStartedTodoId не определен');
      return; // Ничего не делаем, если ID не запомнен
    }

    const lastStartedTodo = todos.find(todo => todo.id === lastStartedTodoId);

    if (!lastStartedTodo) {
      console.log(`toggleLastGo: Todo с ID ${lastStartedTodoId} не найден`);
      return; // Ничего не делаем, если Todo не найден
    }

    // Проверка на completed не нужна, т.к. toggleGo ее выполняет
    console.log(`toggleLastGo: Переключаем таймер для Todo с ID ${lastStartedTodoId}`);
    toggleGo(lastStartedTodoId); // Вызываем toggleGo для последнего запущенного Todo
  }, [lastStartedTodoId, todos, toggleGo]); // Обновлены зависимости

  React.useEffect(() => {
    const handleExtensionEvent = (event) => {
      if (event.detail.data.hotkey === "hotkey1") {
        // console.log('Хоткей получен!');
        toggleLastGo(); // Вызываем toggleLastGo
      }
    };

    window.addEventListener('globalHotkey', handleExtensionEvent);
    
    return () => {
      window.removeEventListener('globalHotkey', handleExtensionEvent);
    };
    // Удален дублирующийся блок window.addEventListener/removeEventListener
  }, [toggleLastGo]); // Обновлена зависимость


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
      durationMs: 0,
      money: 0,
      minuteCost: parseInt(project.tariff, 10)/60,
      tmpDuration: 0
    }]));
  }

  // Обновленная функция editTodo
  function editTodo(id, title, duration, description, money) { // Добавляем description и money
    console.log('editTodo ' + id + ' title: ' + title + ' duration: ' + duration + ' description: ' + description + ' money: ' + money);
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, title: title, duration: parseInt(duration, 10), durationMs: parseInt(duration, 10) * 1000, description: description, money: money }; // Сохраняем description и money
        }
        return todo;
      })
    );
  }

  const openEditModal = (todo) => {
    setTodoToEdit(todo);
    setIsEditModalOpenState(true);
  };

  const closeEditModal = () => {
    setTodoToEdit(null);
    setIsEditModalOpenState(false);
  };
  
  // Передаем setIsEditModalOpen как обертку для setIsEditModalOpenState и setTodoToEdit
  const setIsEditModalOpen = (isOpen, todo = null) => {
    setTodoToEdit(todo);
    setIsEditModalOpenState(isOpen);
  };

  function addProject(title, tariff) {
    console.log('addProject ' + title);
    setProjects(projects.concat([{
      id: Date.now(),
      title,
      tariff: parseInt(tariff, 10)
    }]));
  }

  function removeProject(id) {
    console.log('removeProject ' + id);
    setProjects(projects.filter(project => project.id !== id));
    setTodos(todos.filter(todo => todo.projectId !== id));
    localStorage.setItem('projects', JSON.stringify(projects));
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  // Определение toggleGo перемещено выше

  function toggleCheck(id, e) {
    if (e.target.checked)
      setSelected(selected.concat([id]));
    else 
      setSelected(selected.filter(item => item !== id));
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

    let date = new Date()
    let name = "tasknik "
    //day
    name += `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth()+1).toString().padStart(2, "0")}-${date.getFullYear()}`
    //time
    name += ` ${date.getHours().toString().padStart(2, "0")}-${date.getMinutes().toString().padStart(2, "0")}-${date.getSeconds().toString().padStart(2, "0")}`
    //extension
    name += ".json"

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
              // Process todos to ensure durationMs field
              let todos = JSON.parse(result.todos).map(todo => {
                if (!todo.durationMs) {
                  todo.durationMs = todo.duration * 1000;
                }
                return todo;
              });
              localStorage.setItem('todos', JSON.stringify(todos))
              localStorage.setItem('projects', result.projects)
              window.location.reload()
            } catch (e) {
              console.error(e);
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

  function calcSelectedTotals() {
    let selectedTotalTime = 0
    let selectedTotalAmount = 0
    console.log(selected)
    // eslint-disable-next-line
    todos.map(todo => {
      if (selected.indexOf(todo.id) !== -1) {
        selectedTotalTime += todo.duration
        selectedTotalAmount += todo.money
      }
    })
    setSelectedTotalTime(selectedTotalTime)
    setSelectedTotalAmount(selectedTotalAmount)
  }

  let active = todos.filter((todo => !todo.completed))
  let completed = todos.filter((todo => todo.completed))

  let contextData = {
    toggleCheck, 
    removeTodo, 
    toggleTodo, 
    addTodo,
    editTodo, // Эта функция уже обновлена выше
    addProject,
    toggleGo,
    setIsModalOpen,
    removeProject,
    openEditModal,      // Передаем openEditModal
    closeEditModal,     // Передаем closeEditModal
    setIsEditModalOpen  // Добавляем setIsEditModalOpen в контекст
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
            Всего: ~{Sec2time(totalTime)} &nbsp;
          </div>
          <span title="Сбросить общий таймер" className="action resetTotalAction" onClick={() => resetTotalTime()}>
            <XCircle size={16} color="orange" strokeWidth="2" />
          </span>
          
          <div style={{...styles.buttons, paddingRight: "2rem"}}>
            <span>
              Итог по выбранным: {Sec2time(selectedTotalTime)} / {Math.round(selectedTotalAmount)}
            </span>
          </div>
        </footer>
      </div>
      <Modal 
        isOpen={isModalOpen} 
        todos={todos} 
        projects={projects}
        removeProject={removeProject}
      />
      <EditTodoModal
        isOpen={isEditModalOpen}
        todo={todoToEdit}
        // editTodo и setIsEditModalOpen будут получены из Context в самом EditTodoModal
      />
    </Context.Provider>
  );
}

export default App;
