
import React, {Component} from 'react';
import MessageBox from './MessageBox';
import StatusBox from './StatusBox';
class MessageList extends Component {

	render() {

    const listItems = this.props.messagelist.map((message, i) => 
          {
            if(message.type === 'message') return (
              <MessageBox key={i} text={message.text} time={message.time} currentuser={message.currentuser} />
            );
            else return (
              <StatusBox key={i} status={message.status} count={message.count} />
            );
          }
      );

		return (

			<div className={"messageList"}>
				{listItems}
			</div>

		);
	}
}

export default MessageList;
