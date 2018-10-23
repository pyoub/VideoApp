import React, { Component } from 'react';
import { Image,View,TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

export default class VideoCard extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <TouchableWithoutFeedback onPress={() =>
      { navigate('PlayVideo', { id: this.props.id }); console.log('press', this.props.id)}}>
          <Card>
            <CardItem cardBody>
              <Image style={{position: "absolute"}} source={{uri: this.props.img}} style={{height: 200, width: null, flex: 1}}/>
                <Button primary style={{color:'#ffff' ,  borderRadius : 20, top : 10, backgroundColor:'rgba(0, 0, 0, 0.5)'
, position: "absolute"}} >
                  <Icon active name="eye" />
                  <Text>{this.props.views} Views</Text>
                </Button>
            </CardItem>
          </Card>
      </TouchableWithoutFeedback>
    );
  }
}