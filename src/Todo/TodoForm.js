import React from 'react';
//import PropTypes from 'prop-types';
import Context from '../context';
import ProjectSelectModal from './ProjectSelectModal';

const styles = {
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '.5rem',
    padding: '.5rem',
    boxShadow: '1px 1px 4px 0px rgba(0,0,0,.5)'
  },
  input: {
    paddingLeft: '1rem',
    flexGrow: 1,
    border: 0,
    height: '1.5rem'
  },
  button: {
    cursor: 'pointer',
    background: '#00FFA9',
    color: '#fff',
    border: 0,
    height: '1.5rem'
  }
}

function useTitleInput(defaultTitle = '') {
  const [title, setTitle] = React.useState(defaultTitle);

  return {
    bind: {
      value: title,
      onChange: e => setTitle(e.target.value)
    },
    clear: () => setTitle(''),
    title: () => title
  }
}

function useProjectInput(defaultProjectId = '') {
  const [projectId, setProjectId] = React.useState(defaultProjectId);
  const [selectedProject, setSelectedProject] = React.useState(null);

  return {
    selectProject: (project) => {
      setProjectId(project.id);
      setSelectedProject(project);
    },
    clear: () => {
      setProjectId('');
      setSelectedProject(null);
    },
    projectId,
    selectedProject
  }
}

function TodoForm(props) {
  const {addTodo} = React.useContext(Context);
  const titleInput = useTitleInput('');
  const projectInput = useProjectInput('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  function submitTodo (e) {
    e.preventDefault();
    if (titleInput.title().trim() && projectInput.projectId) {
      console.log('projectId: ' + projectInput.projectId);
      addTodo(titleInput.title(), projectInput.projectId);
      titleInput.clear();
      projectInput.clear();
    } else {
      alert('Нужно заполнить название и выбрать проект');
    }
  }
  return (
    <form style={styles.form} onSubmit={submitTodo}>
      <div>Задачу</div>
      <input placeholder="Название задачи" style={styles.input} {...titleInput.bind} />
      <button 
        type="button"
        style={{
          ...styles.input,
          cursor: 'pointer',
          background: projectInput.selectedProject ? '#fff' : '#f5f5f5'
        }}
        onClick={() => setIsModalOpen(true)}
      >
        {projectInput.selectedProject 
          ? `${projectInput.selectedProject.title}: ${projectInput.selectedProject.tariff}`
          : 'Выберите проект...'}
      </button>
      <ProjectSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projects={props.projects}
        onSelect={projectInput.selectProject}
      />
      <button style={styles.button} type="submit">Создать задачу</button>
    </form>
  );
}

export default TodoForm;
