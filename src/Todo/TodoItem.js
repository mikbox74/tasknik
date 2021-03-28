import React from 'react';
import PropTypes from 'prop-types';
import Context from '../context';
import Sec2time from '../Helpers/Sec2time';

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
  const {removeTodo, toggleTodo, toggleGo, toggleCheck} = React.useContext(Context);
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
        <span className="action goAction" onClick={toggleGo.bind(null, todo.id)}></span>
        <span className="action doneAction" onClick={toggleTodo.bind(null, todo.id)}></span>
        <span className="text duration">
        {Sec2time(todo.duration)}
        </span>
        <span className="text title">
          <strong>{project.title}:</strong>&nbsp;{todo.title}
        </span>
        <span className="text money">
        {Math.round(todo.money)}
        </span>
      </span>
      <button className="action removeAction" onClick={removeTodo.bind(null, todo.id)}>&nbsp;</button>
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