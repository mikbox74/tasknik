import React, { Component } from 'react';
import './Modal.css';

export default class Modal extends Component {
  state = {
    isOpen: false
  }
  render() {
    return (
      <React.Fragment>
        <button onClick={() => this.setState({isOpen: true})}>Открыть</button>

        {this.state.isOpen && (<div className="modal">
          <div className="modal-body">
            <h2>Заголовочко</h2>
            <p>Текстовочко</p>
            <button onClick={() => this.setState({isOpen: false})}>Закрыть</button>
          </div>
        </div>)}
      </React.Fragment>
    );
  }
}