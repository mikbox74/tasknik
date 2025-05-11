import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context';
import './EditTodoModal.css'; // Используем созданные стили

function EditTodoModal({ isOpen, todo }) {
  const { editTodo, closeEditModal } = useContext(Context);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || ''); // Устанавливаем описание или пустую строку

      const totalSeconds = todo.duration || 0;
      setHours(Math.floor(totalSeconds / 3600));
      setMinutes(Math.floor((totalSeconds % 3600) / 60));
      setSeconds(totalSeconds % 60);
    } else {
      setTitle('');
      setDescription('');
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    }
  }, [todo]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!todo) return;

    const newTitle = title.trim();
    const newDescription = description.trim();
    const totalSeconds = (parseInt(hours, 10) || 0) * 3600 +
                         (parseInt(minutes, 10) || 0) * 60 +
                         (parseInt(seconds, 10) || 0);

    if (newTitle) {
      // Передаем также newDescription в editTodo
      editTodo(todo.id, newTitle, totalSeconds, newDescription);
      closeEditModal(); // Закрываем модальное окно после сохранения
    }
  };

  const handleClose = () => {
    closeEditModal();
  };

  if (!isOpen || !todo) {
    return null; // Не рендерим модальное окно, если оно не открыто или нет задачи
  }

  return (
    <div className="modal">
      <div className="modal-body edit-todo-modal-body"> {/* Используем специфичный класс для тела модалки */}
        <h2>Редактировать задачу</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="todoTitle">Название:</label>
            <input
              type="text"
              id="todoTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="todoDescription">Описание:</label>
            <textarea
              id="todoDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            />
          </div>
          <div className="time-inputs">
            <div>
              <label htmlFor="todoHours">Часы:</label>
              <input
                type="number"
                id="todoHours"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                min="0"
              />
            </div>
            <div>
              <label htmlFor="todoMinutes">Минуты:</label>
              <input
                type="number"
                id="todoMinutes"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                min="0"
                max="59"
              />
            </div>
            <div>
              <label htmlFor="todoSeconds">Секунды:</label>
              <input
                type="number"
                id="todoSeconds"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                min="0"
                max="59"
              />
            </div>
          </div>
          <div className="modal-buttons">
            <button type="submit">Сохранить</button>
            <button type="button" onClick={handleClose}>Отмена</button>
          </div>
        </form>
        <button className="close-button" onClick={handleClose}>&times;</button>
      </div>
    </div>
  );
}

EditTodoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  todo: PropTypes.object, // Может быть null, если модальное окно закрыто
};

export default EditTodoModal;
