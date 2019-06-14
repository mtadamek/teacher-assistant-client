import React, { Component } from "react";
import { View, ScrollView, Image, Alert } from "react-native";
import { connect } from "react-redux";
import MainContainer from "../components/MainContainer";
import {
  Icon,
  List,
  ListItem,
  Right,
  Left,
  Body,
  Radio,
  Text,
  Input,
  CheckBox,
  Button,
  Card,
  CardItem,
  Title
} from "native-base";

class StudentBoard extends Component {
  handlePlay = quiz => {
    this.props.navigation.navigate("Quiz", { quiz });
  };

  render() {
    const { user, quizzes } = this.props;
    const Content = (
      <ScrollView
        style={{
          margin: 10
        }}
      >
        {quizzes.length > 0 ? (
          <Title>
            <Text>Do zrobienia</Text>
          </Title>
        ) : null}
        {quizzes.map(quiz => (
          <Card key={quiz.id}>
            <CardItem>
              <Left>
                <Icon active name="list-box" style={{ color: "#007AFF" }} />
                <Body>
                  <Text>{quiz.topic}</Text>
                  <Text note>{`Czas trwania: ${quiz.time}min`}</Text>
                </Body>
              </Left>
              <Right>
                <Button
                  style={{ backgroundColor: "#34A34F" }}
                  onPress={() =>
                    Alert.alert(
                      "Uwaga!",
                      "Czy na pewno chcesz rozpocząć quiz?",
                      [
                        { text: "Nie", style: "cancel" },
                        { text: "Tak", onPress: () => this.handlePlay(quiz) }
                      ],
                      { cancelable: false }
                    )
                  }
                >
                  <Icon name="play" />
                </Button>
              </Right>
              {/* <Text>{JSON.stringify(quiz)}</Text> */}
            </CardItem>
          </Card>
        ))}
      </ScrollView>
    );
    return (
      <MainContainer
        {...this.props}
        content={Content}
        title={`${user.forename} ${user.surname}`}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authorization.user,
    quizzes: state.student.quizzes
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentBoard);
