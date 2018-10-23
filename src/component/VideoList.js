import React, { Component } from "react";
import { FlatList, View, StyleSheet, ActivityIndicator } from "react-native";
import { Container } from "native-base";
import VideoCard from "./VideoCard";
import { connect } from "react-redux";
import { CallApi, MoreVideos } from "../actions/VideoActions";
import _ from "lodash";

export class VideoList extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      _data: null,
      page: 1
    };
    // this.onEndReachedCalledDuringMomentum = true;
  }
  componentDidMount() {
    this.props.CallApi();
  }
  onEndReache = () => {
    this.setState({ page: this.state.page + 1 });
    this.props.MoreVideos(this.state.page);
  };
  componentWillReceiveProps(nextProps) {
    
    console.log("data", nextProps.err);
    if (nextProps.err !== undefined) {
      console.log("err44", nextProps.err);
      this.props.navigation.navigate("error");
    }
    if (
      nextProps.data.list !== this.props.data.list &&
      this.props.data.list !== null
    ) {
      let data = this.state._data;
      console.log("datasource3", this.props.loadingMore);
      if (data !== null)
        _.each(nextProps.data.list, (value) => {
          if (null === data.find((obj) => obj.id === value.id))
            //  if(null === _.find(data, function (obj) { return obj.id === value.id; }))
            data.push(value);
        });
      else {
        data = nextProps.data.list;
        this.setState({
          dataSource: data, //ds.cloneWithRows(data),
          _data: data
        });
      }
    }
  }

  render() {
    if (this.props.loading == true) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else
      return (
        <Container>
          <FlatList
            style={{ flex: 1 }}
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <VideoCard
                navigation={this.props.navigation}
                id={item.id}
                img={item.thumbnail_url}
                views={item.views_total}
              />
            )}
            onEndReached={this.onEndReache.bind(this)}
            onEndReachedThreshold={0.5}
            keyExtractor={(item) => item.id}
            directionalLockEnabled={true}

            //  renderFooter={() => {
            //    console.log(this.state.loadingMore);
            //    return (
            //      this.state.loadingMore &&
            //      <View style={{ flex: 1 }}>
            //        <ActivityIndicator size="small" />
            //      </View>
            //    );
            //  }}
          />
          {this.props.loadingMore && (
            <ActivityIndicator
              style={[styles.centering, { height: 80 }]}
              size="large"
            />
          )}
          {/* </Content> */}
        </Container>
      );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  centering: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8
  }
});
const mapStateToProps = (state) => {
  const { loading, data, err, loadingMore } = state.Videoreducers;
  console.log("lisy", state.Videoreducers.err);
  return { loading, data, err, loadingMore };
};
const mapDispatchToProps = (dispatch) => {
  return {
    CallApi: () => dispatch(CallApi()),
    MoreVideos: (page) => dispatch(MoreVideos(page))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoList);
