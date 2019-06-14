import React, { Component } from "react";
import { createRootNavigator } from "./router";
import { isSignedIn } from "./auth";
import { connect } from "react-redux";
import {
  setUserToken,
  setUserData,
  authChecked
} from "./actions/authorization";
import { connectToSocket } from "./actions/socket";
import { Root } from "native-base";

class App extends Component {
  componentDidMount() {
    isSignedIn()
      .then(res => {
        if (res) {
          this.props.setUserToken(res.token);
          this.props.setUserData(res.user);
          this.props.connectToSocket(res.token);
        }
        this.props.authChecked(true);
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    if (!this.props.checked) {
      return null;
    }
    const Layout = createRootNavigator(this.props.user);
    return (
      <Root>
        <Layout />
      </Root>
    );
  }
}

const mapStateToProps = state => {
  return {
    checked: state.authorization.checked,
    user: state.authorization.user,
    token: state.authorization.token,
    socket: state.socket
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserToken: token => {
      dispatch(setUserToken(token));
    },
    setUserData: user => {
      dispatch(setUserData(user));
    },
    authChecked: checked => {
      dispatch(authChecked(checked));
    },
    connectToSocket: token => {
      dispatch(connectToSocket(token));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
//export default App
