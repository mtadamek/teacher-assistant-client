import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ScrollView } from "react-native";
import {
  Text,
  Spinner,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Badge,
  ActionSheet,
  Card,
  CardItem
} from "native-base";
import { getGroupStudents } from "./../actions/groups";

class Students extends Component {
  componentDidMount() {
    const { id } = this.props.navigation.state.params;
    this.props.getGroupStudents(id);
  }
  //"#34A34F" zielony

  eventSwitcher = (eventId, student) => {
    switch (eventId) {
      case 0:
        this.props.navigation.navigate("SelectQuiz", { studentId: student.id });
        return;
    }
  };

  render() {
    const { loading, error, students, active } = this.props;
    const listItem = students
      ? students.map(student => (
          <ListItem
            avatar
            key={student.id}
            onLongPress={() => {
              ActionSheet.show(
                {
                  options: [
                    { text: "Wyślij quiz", icon: "send", iconColor: "#34A34F" },
                    {
                      text: "Anuluj",
                      icon: "arrow-dropdown-circle",
                      iconColor: "black"
                    }
                  ],
                  cancelButtonIndex: 1
                },
                buttonIndex => {
                  this.eventSwitcher(buttonIndex, student);
                }
              );
            }}
            style={{ marginTop: 5, marginBottom: 5 }}
          >
            <Left>
              <Button
                style={{
                  backgroundColor: active.includes(student.id)
                    ? "#34A34F"
                    : "#FF9501"
                }}
              >
                <Icon active name="person" />
              </Button>
            </Left>
            <Body>
              <Text>{`${student.forename} ${student.surname}`}</Text>
            </Body>
            <Right>
              <Icon name="arrow-dropright" />
            </Right>
          </ListItem>

          // <Card key={student.id}>
          //   <CardItem
          //     onLongPress={() => {
          //       ActionSheet.show(
          //         {
          //           options: [
          //             {
          //               text: "Wyślij quiz",
          //               icon: "send",
          //               iconColor: "#34A34F"
          //             },
          //             {
          //               text: "Anuluj",
          //               icon: "arrow-dropdown-circle",
          //               iconColor: "black"
          //             }
          //           ],
          //           cancelButtonIndex: 1
          //         },
          //         buttonIndex => {
          //           this.eventSwitcher(buttonIndex, student);
          //         }
          //       );
          //     }}
          //   >
          //     <Left>
          //       <Button
          //         style={{
          //           backgroundColor: active.includes(student.id)
          //             ? "#34A34F"
          //             : "#FF9501"
          //         }}
          //       >
          //         <Icon active name="person" />
          //       </Button>
          //       <Body>
          //         <Text>{`${student.forename} ${student.surname}`}</Text>
          //       </Body>
          //     </Left>
          //     <Right>
          //       <Icon name="arrow-dropright" />
          //     </Right>
          //   </CardItem>
          // </Card>
        ))
      : null;

    const Content = loading ? (
      <Spinner color="blue" />
    ) : (
      <ScrollView>
        <List>{listItem}</List>
      </ScrollView>
    );
    return (
      <View style={{ flex: 1, marginTop: 10 }}>
        {error ? <Text>{error}</Text> : null}
        {Content}
      </View>
    ); //<MainContainer {...props} />;
  }
}

const mapStateToProps = state => {
  return {
    students: state.groups.students,
    loading: state.groups.loading,
    error: state.groups.error,
    active: state.groups.active
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGroupStudents: id => {
      dispatch(getGroupStudents(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Students);
