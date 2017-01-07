import React, {PropTypes} from 'react';

export default class MessageItem extends React.Component {
    static propTypes = {
        message: PropTypes.object.isRequired
    };

    render() {
        let date = new Date(this.props.message.time);
        return (
            <li>
                <span>
                  <b>{this.props.message.from}</b>
                  <i>{date.getDay()+ 1 + ". " + date.getMonth() + 1 + ". " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()}</i>
                </span>
                <div>{this.props.message.content}</div>
            </li>
        );
    }
}
