import React from 'react';
import PropTypes from 'prop-types';

function TotalTimer(props) {
  // const [isOpen, setIsOpen] = React.useState(false);
  return (
    <React.Fragment>
      {props.isOpen && (<div className="modal">
        <div className="modal-body">
          <h2>Заголовочко</h2>
          <p>Текстовочко</p>
          <button onClick={() => props.isOpen = true}>Закрыть</button>
        </div>
      </div>)}
    </React.Fragment>
  );
}

TotalTimer.propTypes = {
  isOpen: PropTypes.bool.isRequired
}

export default TotalTimer