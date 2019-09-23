import React, {Component} from 'react';
class MessageBox extends Component {

    render() {
  
      if(this.props.currentuser === true) {
  
        return (
  
          <div className={"userMessage"}>
            <div className={"userText"}> {this.props.text} </div>
            <br/>
            <div className={"messageTime"}> {this.props.time} </div>
          </div>
  
        );
  
      }
      else {
  
        return (
  
          <div className={"MessageText"}>
            <div className={"messageText"}> {this.props.text} </div>
            <br/>
            <div className={"messageTime"}> {this.props.time} </div>
          </div>
  
        );
      }
    }
  }
  
  export default MessageBox;