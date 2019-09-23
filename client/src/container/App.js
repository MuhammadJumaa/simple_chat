import React, {Component} from 'react';
import  './App.css';
import io from "socket.io-client";
import MessageList from '../component/MessageList';
import MessageForm from '../component/MessageForm';
const socket = io('http://localhost:3001/');
class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {messages : [], userid : 0, users : 0};

    this.userAccept = this.userAccept.bind(this);
    this.userJoin = this.userJoin.bind(this);
    this.userLeft = this.userLeft.bind(this);
    this.messageReceive = this.messageReceive.bind(this);
    this.messageSend = this.messageSend.bind(this);
  }

  componentDidMount() {
    socket.emit('user:request');
    socket.on('user:accept', this.userAccept);
    socket.on('user:join', this.userJoin);
    socket.on('user:left', this.userLeft);
    socket.on('send:message', this.messageReceive);
  }

  componentWillUnmount() {
    socket.emit('user:left');
  }

  userAccept(msg) {
    this.setState({ userid : msg.id });
    this.setState({ users : msg.users });

    var newMessages = this.state.messages;
    newMessages.push( { 'type' : 'status', 'status' : 'you joined', 'count' : msg.users} );
    this.setState( {messages : newMessages} );
  }

  userJoin() {
    this.setState((prevState, props) => ({ users: prevState.users + 1 }));

    var newMessages = this.state.messages;
    newMessages.push( { 'type' : 'status', 'status' : 'someone joined', 'count' : this.state.users} );
    this.setState( {messages : newMessages} );
  }

  userLeft() {
    this.setState((prevState, props) => ({ users: prevState.users - 1 }));

    var newMessages = this.state.messages;
    newMessages.push( { 'type' : 'status', 'status' : 'someone left', 'count' : this.state.users} );
    this.setState( {messages : newMessages} );
  }

  messageReceive(msg) {
    if(msg.user === this.state.userid) {
      msg.currentuser = true;
    }
    else {
      msg.currentuser = false;
    }
    var newMessages = this.state.messages;
    newMessages.push(msg);
    this.setState( {messages : newMessages} );
    window.scrollTo(0, document.body.scrollHeight);

  }

  messageSend(message) {
    message.user = this.state.userid;
    socket.emit('send:message', message);
  }

  render() {
    return (

      <div className={"app"}>
        <div className={"heading"}>Working Yeah</div>
        <hr />
        <MessageList messagelist={this.state.messages} />
        <MessageForm onMessageSubmit={this.messageSend} />
      </div>

    );
  }
}

export default App;
