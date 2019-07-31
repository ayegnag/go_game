import React, { Component } from "reactn";
import "./errorBox.scss";

export default class ErrorBox extends Component {
  hideBox = () => {
    this.setGlobal({
      showError: {
        show: false,
        message: ""
      }
    });
  };
  render() {
    const { showError } = this.global;
    const { message, show } = showError;
    return (
      <>
        {show && (
          <div onClick={this.hideBox} className="errModal">
            {message}
          </div>
        )}
      </>
    );
  }
}
