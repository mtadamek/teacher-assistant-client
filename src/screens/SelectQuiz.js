import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { getAllQuizzes } from "../actions/quizzes";
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
  Card,
  CardItem,
  Title,
  Text
} from "native-base";

class SelectQuiz extends Component {
  componentDidMount() {
    this.props.getAllQuizzes();
  }

  handlePress = quizId => {
    const { groupId, studentId } = this.props.navigation.state.params;
    if (groupId) {
      this.props.socket.emit("send-quiz-to-group", { quizId, groupId });
    } else if (studentId) {
      this.props.socket.emit("send-quiz-to-student", { quizId, studentId });
    }
    this.props.navigation.goBack();
  };

  render() {
    const { loading, error, quizzes } = this.props;

    const listItem = quizzes
      ? quizzes.map(quiz => (
          <Card key={quiz.id}>
            <CardItem>
              <Left>
                <Icon active name="list-box" style={{ color: "#007AFF" }} />
                <Body>
                  <Text>{quiz.topic}</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
              <Right>
                <Button
                  style={{ backgroundColor: "#34A34F" }}
                  onPress={() => this.handlePress(quiz.id)}
                >
                  <Icon name="send" />
                </Button>
              </Right>
            </CardItem>
          </Card>
        ))
      : null;

    const Content = loading ? (
      <Spinner color="blue" />
    ) : (
      <ScrollView>{listItem}</ScrollView>
    );

    return <View style={{ flex: 1, margin: 10 }}>{Content}</View>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.authorization.user,
    quizzes: state.quizzes.quizzes,
    loading: state.quizzes.loading,
    error: state.quizzes.error,
    socket: state.socket
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllQuizzes: () => {
      dispatch(getAllQuizzes());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectQuiz);
