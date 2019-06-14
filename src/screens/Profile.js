import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { connect } from "react-redux";
import MainContainer from "../components/MainContainer";
import {
  Icon,
  ListItem,
  Right,
  Left,
  Radio,
  Text,
  Input,
  CheckBox
} from "native-base";

class ProfileScreen extends Component {
  render() {
    const { user } = this.props;
    const Content = user ? (
      <View
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <View style={{ alignSelf: "center" }}>
          <Icon
            name="account-circle"
            type="MaterialIcons"
            style={{ fontSize: 200, color: "#FF9501" }}
          />
        </View>
        <View style={{ alignSelf: "center" }}>
          <Text style={{ fontSize: 25 }}>{`${user.forename} ${
            user.surname
          }`}</Text>
        </View>
        <View style={{ alignSelf: "center" }}>
          <Text note style={{ fontSize: 20 }}>
            {user.role === "teacher" ? "Nauczyciel" : null}
          </Text>
        </View>
      </View>
    ) : null;
    return <MainContainer {...this.props} content={Content} />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.authorization.user
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
