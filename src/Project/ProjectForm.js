import React from 'react';
import Context from '../context';

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
    background: '#293685',
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

function useTariffInput(defaultTariff = '') {
  const [tariff, setTariff] = React.useState(defaultTariff);

  return {
    bind: {
      value: tariff,
      onChange: e => setTariff(e.target.value)
    },
    clear: () => setTariff(''),
    tariff: () => tariff
  }
}

export default function ProjectForm() {
  const {addProject} = React.useContext(Context);
  const titleInput = useTitleInput('');
  const tariffInput = useTariffInput('');

  function submitProject (e) {
    e.preventDefault();
    if (titleInput.title().trim()) {
      addProject(titleInput.title(), tariffInput.tariff());
      titleInput.clear();
      tariffInput.clear();
    } else {
      alert('Нужно заполнить название');
    }
  }
  return (
    <form style={styles.form} onSubmit={submitProject}>
      <div>Проект</div>
      <input placeholder="Название проекта" style={styles.input} {...titleInput.bind} />
      <input placeholder="Стоимость часа" style={styles.input} {...tariffInput.bind} />
      <button style={styles.button} type="submit">Создать проект</button>
    </form>
  );
}