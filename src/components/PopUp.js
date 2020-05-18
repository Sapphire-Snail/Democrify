import React, { Component } from "react";
/* import "./PopUP.css"; */
export default class PopUp extends Component {
    
  handleClick = () => {
    this.props.toggle(); 
  };

  render() {
    return (
       
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleClick}>
            &times;
          </span>
          <form>
            <h3>Name of your new playlist</h3>
             <label>
              <input type="text" name="name" />
            </label>
            <br />
            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }
}
