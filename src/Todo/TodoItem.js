import React from 'react';
import PropTypes from 'prop-types';
import Context from '../context';
import Sec2time from '../Helpers/Sec2time';
import { PlayCircle, PauseCircle, Check, XSquare } from 'react-feather'; // Убираем Edit3

const styles = {
  li: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '.5rem',
    padding: '.5rem',
    boxShadow: '1px 1px 4px 0px rgba(0,0,0,.5)'
  },
};

function TodoItem({project, todo, index, currentId}) {
  const {removeTodo, toggleTodo, toggleGo, toggleCheck, setIsEditModalOpen} = React.useContext(Context); // Добавляем setIsEditModalOpen
  let classes = ['todoTitle'];
  if (todo.completed) {
    classes.push('done');
  }
  if (todo.id === currentId) {
    classes.push('go');
  }
  return (
    <li style={styles.li}>
      <span className={classes.join(' ')}>
        <input type="checkbox" onChange={toggleCheck.bind(null, todo.id)} />
        <span className="action goAction" onClick={toggleGo.bind(null, todo.id)}>
          {(todo.id === currentId) ? <PauseCircle size={16} color="red" strokeWidth="2" /> : <PlayCircle size={16} color="blue" strokeWidth="2" /> }
        </span>
        <span className="action doneAction" onClick={toggleTodo.bind(null, todo.id)}>
          <Check size={16} color="green" strokeWidth="2" />
        </span>
        <span className="text duration">
        {Sec2time(todo.duration)}
        </span>
        <span 
          className="text title action editAction" 
          onClick={() => setIsEditModalOpen(true, todo)} 
          title={todo.description ? todo.description : "Редактировать задачу"}
        >
          <strong>{project.title}:</strong>&nbsp;{todo.title}
        </span>
        <span className="text money">
        {Math.round(todo.money)}
        </span>
      </span>
      {/* Можно добавить отдельную кнопку для редактирования, если клик по названию нежелателен */}
      {/* <button className="action editIconAction" onClick={() => setIsEditModalOpen(true, todo)} title="Редактировать">
        <Edit3 size={16} color="blue" strokeWidth="2" />
      </button> */}
      <button className="action removeAction" onClick={removeTodo.bind(null, todo.id)}>
        <XSquare size={16} color="red" strokeWidth="2" />
      </button>
    </li>
  );
}

TodoItem.propTypes = {
  project: PropTypes.object.isRequired,
  todo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  currentId: PropTypes.number.isRequired
}

export default TodoItem
