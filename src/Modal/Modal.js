import React from 'react';
import PropTypes from 'prop-types';
import Context from '../context';
import Sec2time from '../Helpers/Sec2time';
import './Modal.css';

function Modal(props) {
  const {setIsModalOpen} = React.useContext(Context);
  let projects = props.projects.map((project) => {
    let tmpDuration = props.todos.map((todo) => {
      if (todo.projectId === project.id) {
        return todo.tmpDuration;
      }
      return 0;
    }).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return {
      id: project.id,
      title: project.title,
      tmpDuration
    }
  })
  return (
    <React.Fragment>
      {props.isOpen && (<div className="modal">
        <div className="modal-body">
          <h2>По проектам</h2>
          {
          // eslint-disable-next-line
          projects.map(project => {
            if (project.tmpDuration) {
              return (<p key={project.id}>{project.title}: ~{Sec2time(project.tmpDuration)}</p>)
            }
          })}
          <button onClick={() => setIsModalOpen(false)}>&times;</button>
        </div>
      </div>)}
    </React.Fragment>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Modal