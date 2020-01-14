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
  return (
    <ul style={styles.ul}>
        {props.todos.map((todo, i) => {
          let project = props.projects.find((project) => project.id === todo.projectId);
          return <Todoitem currentId={props.currentId} project={project} todo={todo} key={todo.id} index={i} />;
        })}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentId: PropTypes.number.isRequired
}

export default TodoList