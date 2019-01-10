import React, { Component } from 'react';
import '../src/style.css'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import {
  getCurrentPot,
  sendNameToServer,
  sendIDToServer,
  sendPitchInToServer,
  sendGetOneToServer
} from './socket';
import { getAName, getAID } from './usernames';
import SnackBarNotif from './SnackbarNotif';
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'

class App extends Component {

  constructor() {
    super()
    this.state = {
        roomId: null,
        messages: [],
        joinableRooms: [],
        joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.createRoom = this.createRoom.bind(this)
} 

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: 'perborgen',
      tokenProvider: new Chatkit.TokenProvider({
          url: tokenUrl
      })
    })
    chatManager.connect()
    .then(currentUser => {
        this.currentUser = currentUser
        console.log(this.currentUser)
        this.getRooms()
    })
    .catch(err => console.log('error on connecting: ', err))
    const { dispatch } = this.props;
    const name = getAName();
    const id = getAID()
    getCurrentPot(dispatch);
    dispatch({ type: 'ASSIGNED_USERNAME', name });
    dispatch({ type: 'ASSIGNED_USERNAMEID', id })
    sendNameToServer(name);
    sendIDToServer(id);
    console.log(id)
  }

  getRooms() {
    this.currentUser.getJoinableRooms()
    .then(joinableRooms => {
        this.setState({
            joinableRooms,
            joinedRooms: this.currentUser.rooms
        })
    })
    .catch(err => console.log('error on joinableRooms: ', err))
}

subscribeToRoom(roomId) {
    this.setState({ messages: [] })
    this.currentUser.subscribeToRoom({
        roomId: roomId,
        hooks: {
            onNewMessage: message => {
                this.setState({
                    messages: [...this.state.messages, message]
                })
            }
            
        }
    })
    .then(room => {
        this.setState({
            roomId: room.id
        })
        this.getRooms()
    })
    .catch(err => console.log('error on subscribing to room: ', err))
}

sendMessage(text) {
    this.currentUser.sendMessage({
        text,
        roomId: this.state.roomId
    })
}

createRoom(name) {
    this.currentUser.createRoom({
        name
    })
    .then(room => {
        this.subscribeToRoom(room.id)
    })
    .catch(err => console.log('error with createRoom: ', err))
}

  closeSnackbar = () => this.props.dispatch({ type: 'ANOTHER_ONE_PITCHED_IN' });

  getOne = () => {
    const { dispatch, name } = this.props;
    dispatch({ type: 'GET_ONE' });
    sendGetOneToServer(name);
  };

  pitchIn = () => {
    const { dispatch, name } = this.props;
    dispatch({ type: 'PITCH_IN' });
    sendPitchInToServer(name);
  };

  render() {
    const {
      id,
      pot,
      name,
      names,
      snackbarIsOpen,
      mode,
      whoDidIt
    } = this.props;
    return (
      <div>
            <div className="chat-app">
                <RoomList
                    subscribeToRoom={this.subscribeToRoom}
                    rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                    roomId={this.state.roomId} />
                <MessageList 
                    roomId={this.state.roomId}
                    messages={this.state.messages} />
                <SendMessageForm
                    disabled={!this.state.roomId}
                    sendMessage={this.sendMessage} />
                <NewRoomForm createRoom={this.createRoom} />
            </div>
        <Grid container justify="center">
          <Grid style={{ textAlign: 'center' }} item xs={12}>
            <h1>{pot}</h1>
          </Grid>
          <Grid style={{ textAlign: 'right', padding: '10px' }} item xs={6}>
            <Button onClick={this.pitchIn} variant="contained" color="primary">
              pitch in!
          </Button>
          </Grid>
          <Grid style={{ textAlign: 'left', padding: '10px' }} item xs={6}>
            <Button onClick={this.getOne} variant="contained" color="secondary">
              get one!
          </Button>
          </Grid>
          <Grid style={{ textAlign: 'center' }} item xs={12}>
            <div
              style={{
                height: '500px',
                textAlign: 'center',
                width: '300px',
                border: '1px solod black',
                display: 'inline-block'
              }}
            >
              Your assigned username is{' '}
              <span style={{ color: 'red' }}>{name}</span>
              <div style={{ padding: '10px' }}>
                Your assigned username id{' '}
                <span style={{ color: 'red' }}>{id}</span>
                <div style={{ padding: '10px' }}></div>
                Other members:
              {names.length <= 1 ? (
                  <div style={{ color: 'red' }}>No other members yet</div>
                ) : (
                    names.map(member => (
                      <div
                        style={{ display: name === member && 'none' }}
                        key={member}
                      >
                        {member}
                      </div>
                    ))
                  )}
              </div>
            </div>
          </Grid>
          <SnackBarNotif
            mode={mode}
            closeSnackbar={this.closeSnackbar}
            name={whoDidIt}
            snackbarIsOpen={snackbarIsOpen}
          />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  id: state.id,
  pot: state.pot,
  name: state.name,
  names: state.names,
  snackbarIsOpen: state.snackbarIsOpen,
  mode: state.mode,
  whoDidIt: state.whoDidIt
});

export default connect(mapStateToProps)(App);
