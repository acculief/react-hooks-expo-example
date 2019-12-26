import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList
} from "react-native";
const io = require("socket.io-client");

// Replace this URL with your own, if you want to run the backend locally!
const SocketEndpoint = "http://localhost:3000/";

export default class App extends React.Component {
  state = {
    isConnected: false,
    data: null,
    name: "taro",
    message: "",
    messageList: []
  };
  socket = io.connect(SocketEndpoint, {
    transports: ["websocket"],
    reconnectionAttempts: 15
  });

  componentDidMount() {
    this.socket.on("connect", () => {
      this.setState({ isConnected: true });
    });
    this.socket.on("chat-message-for-mobile", data => {
      this.setState({
        messageList: [
          ...this.state.messageList,
          { name: data.name, message: data.message }
        ]
      });
    });
    this.socket.emit("new-user", this.state.name);
  }

  emitMessage() {
    this.socket.emit("send-chat-message", this.state.message);
    this.setState({
      messageList: [
        ...this.state.messageList,
        { name: this.state.name, message: this.state.message }
      ],
      message: ""
    });
    console.log(this.state.messageList);
  }

  renderItem = item => {
    return (
      <View>
        <Text>
          {item.name}:{item.message}
        </Text>
      </View>
    );
  };

  render() {
    if (this.state.isConnected) {
      return (
        <View style={styles.container}>
          <Text style={{ color: "red" }}>connected: true</Text>
          <FlatList
            data={this.state.messageList}
            renderItem={({ item }) => this.renderItem(item)}
            enableEmptySections={true}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={{ width: "100%", paddingHorizontal: 15 }}>
            <TextInput
              style={{
                paddingHorizontal: 15,
                borderColor: "#DBDBDB",
                borderWidth: 1,
                borderRadius: 20
              }}
              value={this.state.message}
              onChangeText={text => this.setState({ message: text })}
            />
          </View>
          <Button
            title={"Send"}
            color={"red"}
            onPress={() => this.emitMessage()}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text>connected: false</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
