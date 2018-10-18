import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View
} from "react-native";
export default class Error extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.noWifi}
          source={require("../../assets/error.png")}
        />
        <Text style={styles.errorHead}>Oops!</Text>
        <Text style={styles.errordesc}>There no response from server.</Text>
        <TouchableHighlight
                onPress={() => this.props.navigation.navigate("home")}
        >
          <Text style={styles.retry}>Retry</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0e1113"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  errorHead: {
    color: "#fff",
    fontSize: 25
  },
  errordesc: {
    color: "#b6b6b6",
    fontSize: 12
  },
  noWifi: {
    width: 64,
    height: 64
  },
  retry: {
    marginTop: 25,
    backgroundColor: "#fff",
    color: "#000",
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 3,
    fontSize: 14
  }
});
