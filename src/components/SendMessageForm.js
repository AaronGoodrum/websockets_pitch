import React from 'react'
import TextField from '@material-ui/core/TextField';

class SendMessageForm extends React.Component {
  render() {
    return (
      <form className="send-message-form">
        <TextField
          id="standard-with-placeholder"
          label="Chatting"
          placeholder="Hello There"
          margin="normal"
        />
      </form>
    )
  }
}

export default SendMessageForm