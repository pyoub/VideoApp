import {
  WebView,
  Alert,
  ActivityIndicator,
  ToastAndroid,
  Dimensions
} from "react-native";
import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Button, Text, Header } from "native-base";
import { MoreVideos } from "../actions/VideoActions";

var ListIds = [];
let WebViewRef;
export class VideoPlayer extends Component {
  // static navigationOptions = {
  //   title: "Player",
  //   header: {
  //     visible: false
  //   }
  //  };
         static navigationOptions = ({ navigation }) => {
           return { title: "Player", header: navigation.state.params ? navigation.state.params.header : undefined };
         };
         isPortrait = () => {
           const dim = Dimensions.get("screen");
           return dim.height >= dim.width;
         };
         componentDidMount() {
           
           this.setState({ Id: this.props.navigation.getParam("id") });
           ListIds.push(this.props.navigation.getParam("id"));
           console.log("page", this.props.navigation.getParam("id"));
  }
         constructor(props) {
           super(props);
           this.state = { visible: true, Id: null, Next: false, height: this.isPortrait() ? "50%" : "100%", display: this.isPortrait() ? "flex" : "none" };
           Dimensions.addEventListener("change", () => {
             this.setState({
               height: this.isPortrait() ? "50%" : "100%",
               display: this.isPortrait() ? "flex" : "none"
             });
             this.isPortrait() ? this.props.navigation.setParams({
               header: undefined
                 }) : this.props.navigation.setParams({
                   header: null
                 });
           });
         }
         componentWillReceiveProps(nextProps) {
           // if(this.state.Id === null && nextProps.navigation.getParam('id') !== undefined)
           // {
           //     this.setState({Id:nextProps.navigation.getParam('id')})
           //     ListIds.push(this.state.Id)
           //     ()=>{ WebViewRef && WebViewRef.reload();}
           // }
           console.log("before", nextProps);
           if (nextProps.data.list !== undefined && nextProps.data.list.length > 0 && this.state.Next) {
             let data = nextProps.data.list;
             var rand = 1 + Math.random() * (7 - 1);
             console.log("data", nextProps.data.list, data);
             console.log("n", rand);
             this.setState({ Id: data[parseInt(rand)].id, Next: false });
             ListIds.push(this.state.Id);
             // ()=>{ WebViewRef && WebViewRef.reload();}
           }
         }

         showSpinner() {
           console.log("Show Spinner");
           this.setState({ visible: true });
         }

         hideSpinner() {
           console.log("Hide Spinner");
           this.setState({ visible: false });
         }
         handleClickNext() {
           this.setState({ Next: true });
           var rand = 1 + Math.random() * (10 - 1);
           this.props.MoreVideos(parseInt(rand));
         }
         handleClickPrev() {
           if (ListIds.length > 1) {
             this.setState({ Id: ListIds[ListIds.length - 1] });
             ListIds.pop(ListIds.length - 1);
             //  WebViewRef.reload()
           } else ToastAndroid.showWithGravity("Click Next", ToastAndroid.SHORT, ToastAndroid.CENTER);
         }
         render() {
           return <View style={{ top: 5, height: this.state.height }}>
               <WebView ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)} source={{ uri: "http://www.dailymotion.com/embed/video/" + this.state.Id }} automaticallyAdjustContentInsets={false} onLoadStart={() => this.showSpinner()} onLoadEnd={() => this.hideSpinner()} />
               <View style={{ display: this.state.display, top: 5, width: "100%", height: "20%", flexDirection: "row", justifyContent: "space-between" }}>
                 <Button success onPress={this.handleClickPrev.bind(this)} style={{ width: "50%" }}>
                   <Text>Prev</Text>
                 </Button>
                 <Button primary onPress={this.handleClickNext.bind(this)} style={{ width: "50%" }}>
                   <Text>Next</Text>
                 </Button>
               </View>
               {this.state.visible && <ActivityIndicator style={{ position: "absolute", top: "45%", left: "45%" }} size="large" />}
             </View>;
           // Later on in your styles..
         }
       }

const mapStateToProps = state => {
  const { loading, data, err } = state.Videoreducers;
  console.log("lisy", state.Videoreducers.loadingMore);
  return { loading, data, err };
};
const mapDispatchToProps = dispatch => {
  return {
    MoreVideos: page => dispatch(MoreVideos(page))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPlayer);
