import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authorization";
import { disconnectFromSocket } from "../actions/socket";
import { Alert } from "react-native";
import {
  Icon,
  Body,
  Button,
  Container,
  Header,
  Content,
  Left,
  Title,
  Right
} from "native-base";

class MainContainer extends Component {
  handleLogOut = () => {
    this.props.disconnectFromSocket();
    this.props.logoutUser();
  };

  render() {
    const leftContent = this.props.navigation.openDrawer ? (
      <Button
        transparent
        onPress={() => {
          this.props.navigation.openDrawer();
        }}
      >
        <Icon name="menu" />
      </Button>
    ) : (
      <Icon name="person" style={{ color: "white" }} />
    );
    return (
      <Container>
        <Header>
          <Left>{leftContent}</Left>
          <Body>
            <Title>
              {this.props.title
                ? this.props.title
                : this.props.navigation.state.params
                ? this.props.navigation.state.params.mainTitle
                : this.props.navigation.state.routeName}
            </Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() =>
                Alert.alert(
                  ":(",
                  "Czy na pewno chcesz się wylogować?",
                  [
                    { text: "Nie", style: "cancel" },
                    { text: "Tak", onPress: () => this.handleLogOut() }
                  ],
                  { cancelable: false }
                )
              }
            >
              <Icon name="exit" />
            </Button>
          </Right>
        </Header>
        <Content>{this.props.content}</Content>
        {this.props.fab ? this.props.fab : null}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
      dispatch(logoutUser());
    },
    disconnectFromSocket: () => {
      dispatch(disconnectFromSocket());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
