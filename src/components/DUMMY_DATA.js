import React, { Component } from 'react'

class DUMMY_DATA extends Component {
  constructor() {
    super();
    this.state = {
      userMessages: [],
    }
  }

  componentDidMount() {
    // fetch('https://jsonplaceholder.typicode.com/posts')
      // fetch('http://jsonplaceholder.typicode.com/comments?postId=1')
      fetch('http://jsonplaceholder.typicode.com/users')
      .then(response => {
       return response.json()
      }).then(data => {
        let userMessages = data.map((message) => {
          return (
            <div key={message.id}>
              <div className="message-username1">
                {message.name} </div>
              <div className="message-text">
                {message.company.catchPhrase} </div>
            </div>
          )
        })
        this.setState({ userMessages: userMessages })
        console.log("State", this.state.userMessages)
      })
  }

  render() {
    return (
      <div className="message">
        {this.state.userMessages}
      </div>
    )
  }
}

export default DUMMY_DATA