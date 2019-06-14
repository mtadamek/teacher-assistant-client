import React, { Component } from "react";
import { Text, View, Alert } from "react-native";
import { connect } from "react-redux";
import { getAllGroups } from "../actions/groups";
import MainContainer from "../components/MainContainer";
import {
  Icon,
  List,
  ListItem,
  Left,
  Button,
  Body,
  Right,
  Spinner,
  ActionSheet
} from "native-base";

class Groups extends Component {
  componentDidMount() {
    this.props.getAllGroups();
  }

  handlePress = group => {
    const { id, name } = group;
    this.props.navigation.navigate("Students", { id, name });
  };

  eventSwitcher = (eventId, group) => {
    switch (eventId) {
      case 0:
        this.props.navigation.navigate("SelectQuiz", { groupId: group.id });
        return;
      case 1:
        this.props.navigation.navigate("GroupStatistics", { groupId: group.id, groupName: group.name });
        return;
    }
  };

  render() {
    const { loading, error, groups } = this.props;

    const listItem = groups
      ? groups.map(group => (
          <ListItem
            button
            key={group.id}
            onPress={() => {
              this.handlePress(group);
            }}
            onLongPress={() => {
              ActionSheet.show(
                {
                  options: [
                    { text: "Wyślij quiz", icon: "send", iconColor: "#34A34F" },
                    { text: "Oceny", icon: "md-star", iconColor: "#eec743", iconType: "MaterialIcons" },
                    {
                      text: "Anuluj",
                      icon: "arrow-dropdown-circle",
                      iconColor: "black"
                    }
                  ],
                  cancelButtonIndex: 2
                },
                buttonIndex => {
                  this.eventSwitcher(buttonIndex, group);
                }
              );
            }}
          >
            <Left>
              <Button style={{ backgroundColor: "#FF9501" }}>
                <Icon active name="contacts" />
              </Button>
            </Left>
            <Body>
              <Text>{group.name}</Text>
            </Body>
            <Right>
              <Icon name="arrow-dropright" />
            </Right>
          </ListItem>
        ))
      : null;

    const Content = loading ? (
      <Spinner color="blue" />
    ) : (
      <List>{listItem}</List>
    );

    return <MainContainer {...this.props} content={Content} />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.authorization.user,
    groups: state.groups.groups,
    loading: state.groups.loading,
    error: state.groups.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllGroups: id => {
      dispatch(getAllGroups(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups);
