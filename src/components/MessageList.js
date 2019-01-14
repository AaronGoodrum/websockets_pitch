import React from 'react'
import DUMMY_DATA from './DUMMY_DATA'

// const DUMMY_DATA = [
//     {
//         senderId: 'perborgen',
//         text: 'Hey, how is it going?'
//     },
//     {
//         senderId: 'janedoe',
//         text: 'Great! How about you?'
//     },
//     {
//         senderId: 'perborgen',
//         text: 'Good to hear! I am great as well'
//     }
// ]

class MessageList extends React.Component {
    render() {
        return (
            <div className="message-list">
            <DUMMY_DATA />
            </div>
        )
    }
}

export default MessageList