import React from 'react';
import Todoitem from './TodoItem';
import PropTypes from 'prop-types';

const styles = {
  ul: {
    listStyle: 'none',
    textAlign: 'left',
    margin: 0,
    padding: 0,
    width: '100%'
  }
};

function  TodoList (props) {
  // props.todos.sort(function(a, b) {
  //   if (a.completed > b.completed) {
  //     return 1;
  //   }
  //   if (a.completed < b.completed) {
  //     return -1;
  //   }
  //   // a должно быть равным b
  //   return 0;
  // });
  return (
    <div>
    <h3>{props.title}</h3>
    <ul style={styles.ul}>
        {props.todos.map((todo, i) => {
          let project = props.projects.find((project) => project.id === todo.projectId);
          return <Todoitem currentId={props.currentId} project={project} todo={todo} key={todo.id} index={i} />;
        })}
    </ul>
    </div>
  );
}

TodoList.propTypes = {
  title: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentId: PropTypes.number.isRequired
}

export default TodoList