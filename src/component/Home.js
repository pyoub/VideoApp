import React, { Component } from 'react';
import {
  StyleSheet,
  NetInfo,
  Text,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";
import { Container, Header } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {RandomVideos} from '../actions/VideoActions';
import { connect } from 'react-redux'


export class Home extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = { tolist: false,  randomvideo: false }
  }


  // ViewportHeight = Dimensions.get("window").height;
  _random = () => {
    this.setState({ tolist: false, randomvideo: true });
    console.log("randomvideo", this.props.randomvideo);
    this.props.RandomVideos();
    // this.props.navigation.navigate('PlayVideo', { id: this.props.data.list[0].id });
    // this.props.navigation.navigate('ListVideos');
  }
  componentWillReceiveProps(nextprops) {
    if (nextprops.data.list !== undefined && this.state.tolist === false) {
      nextprops.navigation.navigate('PlayVideo', { id: nextprops.data.list[0].id });
      this.setState({ tolist: true, randomvideo: false });
    }
  }
  render() {
      if (!this.state.randomvideo)
      {
        return (
          <Container>
            <Grid>
              <Row>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.setState({ tolist: true });
                    this.props.navigation.navigate('ListVideos');
                  }}>
                  <ImageBackground
                    style={styles.image}
                    source={require('../../assets/list.jpg')}
                    // resizeMethod='scale'
                    resizeMethod='scale'
                    blurRadius={2}
                  >
                    <Text style={{ color: 'white', fontSize: 50, fontWeight: 'bold' }}>List Videos</Text>
                  </ImageBackground>
                </TouchableWithoutFeedback>
              </Row>
              <Row >
                <TouchableWithoutFeedback
                  onPress={this._random.bind(this)}>
                  <ImageBackground
                    source={require('../../assets/random.jpg')}
                    style={styles.image}
                    resizeMethod='scale'
                    blurRadius={3}>
                    <Text style={{ color: 'white', fontSize: 50, fontWeight: 'bold' }}>Random Video</Text>
                  </ImageBackground>
                </TouchableWithoutFeedback>
              </Row>
            </Grid>
          </Container>
        );
      }else {
        return (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" />
          </View>);
      }
  
    
  }
}
const styles = StyleSheet.create({
  image: {
    height : '100%',
    width : '100%',
    display : 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}, container: {
  flex: 1,
  justifyContent: 'center'
},
horizontal: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  padding: 10
},
centering: {
  alignItems: 'center',
  justifyContent: 'center',
  padding: 8,

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
    height: 64,
  },
  retry: {
    marginTop: 25,
    backgroundColor: '#fff',
    color: "#000",
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 3,
    fontSize: 14
  }
});
const mapStateToProps = state =>{
  const {data,err,randomvideo} = state.Videoreducers;
  console.log('lose',state.Videoreducers)
  return {data,err,randomvideo};
}
const mapDispatchToProps = (dispatch)=>{
  return({
    RandomVideos:()=>dispatch(RandomVideos())})
};
export default connect(mapStateToProps,mapDispatchToProps)(Home)