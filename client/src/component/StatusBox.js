import React, {Component} from 'react';
class StatusBox extends Component {

  render() {

    return (

      <div className={"statusBox"}>
        {this.props.status} <br/>
        there {this.props.count > 1 ? 'are' : 'is'} {this.props.count} {this.props.count > 1 ? 'participants' : 'participant'}
      </div>

    );
  }
}
export default StatusBox;