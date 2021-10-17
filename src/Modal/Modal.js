import React from "react";
import "./Modal.css";

export default class Modal extends React.Component {
  state = {
    isOpen: false,
  };
  render() {
    return (
      <React.Fragment>
        <button onClick={() => this.setState({ isOpen: true })}>
          Open modal Alert
        </button>

        {this.state.isOpen && (
          <div className="modal">
            <div className="modal-body">
              <h1>Modal Alert title</h1>
              <p>Alert text:</p>
              <p>You can add todo to the list in the input below</p>
              <button onClick={() => this.setState({ isOpen: false })}>Close modal Alert</button>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
