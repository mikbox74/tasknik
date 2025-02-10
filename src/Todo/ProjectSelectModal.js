import React from 'react';
import PropTypes from 'prop-types';
import './ProjectSelectModal.css';
import Context from '../context';
import { Trash2 } from 'react-feather';

function ProjectSelectModal({ isOpen, onClose, projects, onSelect }) {
  const {removeProject} = React.useContext(Context);
  if (!isOpen) return null;
  
  return (
    <div className="modal">
      <div className="modal-body">
        <h2>Выберите проект</h2>
        <ul className="project-list">
          {projects.map(project => (
            <li
              key={project.id}
              className="project-item"
              onClick={() => {
                onSelect(project);
                onClose();
              }}
              >
                {project.title}: {project.tariff}
                <button
                  className="project-delete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm(`Вы уверены, что хотите удалить проект "${project.title}" и все связанные с ним задачи?`)) {
                      removeProject(project.id);
                      onClose();
                    }
                  }}
                >
                  <Trash2 size={20} color="red" strokeWidth="2" />
                </button>
            </li>
          ))}
        </ul>
        <button onClick={onClose}>&times;</button>
      </div>
    </div>
  );
}

ProjectSelectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ProjectSelectModal;
