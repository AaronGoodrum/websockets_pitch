import React from 'react'

class Message extends React.Component {  
    render() {
        return (
            <div className="message">
                <div className="message-username">{this.props.user}</div>
                <div className="message-text">{this.props.text}</div>
            </div>
        )
    }
}

export default Message

// import ReactDOM from 'react-dom'
// import Message from './Message'

// class MessageList extends React.Component {
    
//     componentWillUpdate() {
//         const node = ReactDOM.findDOMNode(this)
//         this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
//     }
    
//     componentDidUpdate() {
//         if (this.shouldScrollToBottom) {
//             const node = ReactDOM.findDOMNode(this)
//             node.scrollTop = node.scrollHeight   
//         }
//     }
    
//     render() {
//         if (!this.props.roomId) {
//             return (
//                 <div className="message-list">
//                     <div className="join-room">
//                         Join a room! &rarr; 
//                     </div>
//                 </div>
//             )
//         }
//         return (
//             <div className="message-list">
//                 {this.props.messages.map((message, index) => {
//                     return (
//                         <Message key={message.id} username={message.senderId} text={message.text} />
//                     )
//                 })}
//             </div>
//         )
//     }
// }

// export default MessageList