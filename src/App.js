import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, compose } from 'redux'
import VideoPlayer from './component/VideoPlayer'
import VideoList from './component/VideoList'
import Home from './component/Home'
import Reducer from './reducers/Reducer'
import thunk from 'redux-thunk'
import { createStackNavigator } from 'react-navigation'
import { StyleSheet, NetInfo, Text, TouchableHighlight, Image, View } from 'react-native'

const Navig = createStackNavigator({
  home: { screen: Home },
  ListVideos: { screen: VideoList },
  PlayVideo: { screen: VideoPlayer }
})
let store = createStore(
  Reducer, // custom reducers
  applyMiddleware(
    thunk
  // all middlewares
  // axiosMiddleware(client), //second parameter options can optionally contain onSuccess, onError, onComplete, successSuffix, errorSuffix
  )
)
export default class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      name: 'hello',
      connected: true
    }
  }
  checkConnection () {
    NetInfo.isConnected.fetch().then(isConnected => {
      console.log('connected : ', isConnected)
      if (isConnected) {
        this.setState({ connected: true })
        console.log('First, is ' + (isConnected ? 'online' : 'offline'))
      // Alert.alert("Error", isConnected ? 'online' : 'offline', [{ "text": 'retry',onPress : ()=> this.checkConnection()}])
      }else {
        this.setState({ connected: false })
      }
    })
  }
  componentDidMount () {
    NetInfo.isConnected.addEventListener('connectionChange', () =>{  this.checkConnection()})
    console.log(NetInfo.isConnected)
  }

  render () {
    if (!this.state.connected) {
      return (
        <View style={styles.container}>
          <Image style={styles.noWifi} source={require('../assets/wifi.png')} />
          <Text style={styles.errorHead}>
            Oops!
          </Text>
          <Text style={styles.errordesc}>
            Please check you internet connection.
          </Text>
          <TouchableHighlight onPress={() => {this.checkConnection()}}>
            <Text style={styles.retry}>
              Retry
            </Text>
          </TouchableHighlight>
        </View>)
    } else {
      return (
        <Provider store={store}>
          <Navig />
        </Provider>
      )
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0e1113'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  errorHead: {
    color: '#fff',
    fontSize: 25
  },
  errordesc: {
    color: '#b6b6b6',
    fontSize: 12
  },
  noWifi: {
    width: 64,
    height: 64
  },
  retry: {
    marginTop: 25,
    backgroundColor: '#fff',
    color: '#000',
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 3,
    fontSize: 14
  }
})
