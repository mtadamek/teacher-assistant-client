import React, { Component } from "react";
import { connect } from "react-redux";
import MainContainer from "../components/MainContainer";
import { View, ScrollView, Alert } from "react-native";
import {
  Text,
  Icon,
  Fab,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Button,
  ActionSheet,
  Spinner
} from "native-base";
import { getAllQuizzes, deleteQuiz } from "../actions/quizzes";

class Quizzes extends Component {
  componentDidMount() {
    this.props.getAllQuizzes();
  }

  handleQuizPress = quiz => {
    this.props.navigation.navigate("ManageQuiz", { quiz });
  };

  handleFabPress = () => {
    this.props.navigation.navigate("ManageQuiz");
  };

  eventSwitcher = (eventId, quiz) => {
    switch (eventId) {
      case 0:
        Alert.alert(
          "Uwaga!",
          "Czy na pewno chcesz usunąć quiz?",
          [
            { text: "Nie", style: "cancel" },
            { text: "Tak", onPress: () => this.props.deleteQuiz(quiz.id) }
          ],
          { cancelable: false }
        );
        return;
    }
  };

  render() {
    const { quizzes, loading, error } = this.props;

    const QuizzesItems = quizzes
      ? quizzes.map(quiz => (
          <ListItem
            button
            key={quiz.id}
            onPress={() => this.handleQuizPress(quiz)}
            onLongPress={() => {
              ActionSheet.show(
                {
                  options: [
                    { text: "Usuń", icon: "trash", iconColor: "#fa213b" },
                    {
                      text: "Anuluj",
                      icon: "arrow-dropdown-circle",
                      iconColor: "black"
                    }
                  ],
                  destructiveButtonIndex: 0,
                  cancelButtonIndex: 1
                },
                buttonIndex => {
                  this.eventSwitcher(buttonIndex, quiz);
                }
              );
            }}
          >
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="list-box" />
              </Button>
            </Left>
            <Body>
              <Text>{quiz.topic}</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
        ))
      : null;

    const FabComponent = (
      <View>
        <Fab
          active={false}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: "#34A34F" }}
          position="bottomRight"
          onPress={this.handleFabPress}
        >
          <Icon name="add" />
        </Fab>
      </View>
    );

    const Content = loading ? (
      <Spinner color="blue" />
    ) : (
      <ScrollView>
        <List>{QuizzesItems}</List>
      </ScrollView>
    );

    return (
      <MainContainer {...this.props} content={Content} fab={FabComponent} />
    );
  }
}

const mapStateToProps = state => {
  return {
    quizzes: state.quizzes.quizzes,
    loading: state.quizzes.loading,
    error: state.quizzes.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllQuizzes: () => {
      dispatch(getAllQuizzes());
    },
    deleteQuiz: id => {
      dispatch(deleteQuiz(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quizzes);
