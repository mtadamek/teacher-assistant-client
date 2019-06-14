import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { getAllQuizzes } from "../actions/quizzes";
import { getGroupStudents } from "./../actions/groups";
import { getGroupStatistics } from "./../actions/statistics";
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
  Text,
  Picker,
  Toast
} from "native-base";

class GroupStatistics extends Component {
  state = {
    selectedValue: 0
  };
  componentDidMount() {
    const { groupId } = this.props.navigation.state.params;
    this.props.getGroupStudents(groupId);
    this.props.getAllQuizzes();
  }

  handleStudentPress = data => {
    console.log("handleStudentPress", data);
    if (data.values) {
      this.props.navigation.navigate("QuizPreview", data);
    } else {
      Toast.show({
        text: "Uczeń nie rozwiązał tego quizu!",
        buttonText: "Ok",
        type: "warning"
      });
    }
  };

  handlePickerValueChange = quizId => {
    const { groupId } = this.props.navigation.state.params;
    this.setState({ selectedValue: quizId });
    this.props.getGroupStatistics({ quizId, groupId });
  };

  render() {
    const { groupName } = this.props.navigation.state.params;
    const {
      loadingQuizzes,
      loadingGroup,
      loadingStatistics,
      error,
      quizzes,
      students,
      statistics
    } = this.props;

    const pickerItems = quizzes
      ? quizzes.map(quiz => (
          <Picker.Item key={quiz.id} label={quiz.topic} value={quiz.id} />
        ))
      : null;

    if (this.state.selectedValue === 0) {
      pickerItems.unshift(
        <Picker.Item key={0} label="Wybierz quiz" value={0} />
      );
    }

    const Content = loadingQuizzes ? (
      <Spinner color="blue" />
    ) : (
      <Card>
        <CardItem header bordered>
          <Text>Quiz</Text>
        </CardItem>
        <CardItem bordered>
          <Picker
            renderHeader
            mode="dropdown"
            onValueChange={this.handlePickerValueChange}
            selectedValue={this.state.selectedValue}
          >
            {pickerItems}
          </Picker>
        </CardItem>
      </Card>
    );

    const studentsList = students
      ? students.map(student => {
          let result = "-";
          if (statistics && statistics[student.id]) {
            const { max, points } = statistics[student.id].result;
            result = `${((points / max) * 100).toFixed()}%`;
          }
          return (
            <ListItem
              bordered
              key={student.id}
              onPress={() =>
                this.handleStudentPress({
                  quiz: this.props.quizzes.find(
                    quiz => quiz.id === this.state.selectedValue
                  ),
                  values: statistics[student.id]
                    ? statistics[student.id].values
                    : null
                })
              }
            >
              <Left>
                <Text>{`${student.forename} ${student.surname}`}</Text>
              </Left>
              <Right>
                <Text>{result}</Text>
              </Right>
            </ListItem>
          );
        })
      : null;

    return (
      <ScrollView style={{ marginLeft: 10, marginRight: 10 }}>
        {Content}
        {loadingGroup || loadingStatistics ? (
          <Spinner color="blue" />
        ) : (
          <Card>
            <CardItem header bordered>
              <Text>{groupName}</Text>
            </CardItem>
            {studentsList}
          </Card>
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authorization.user,
    quizzes: state.quizzes.quizzes,
    loadingQuizzes: state.quizzes.loading,
    error: state.quizzes.error,
    students: state.groups.students,
    loadingGroup: state.groups.loading,
    statistics: state.statistics.statistics,
    loadingStatistics: state.statistics.loading,
    socket: state.socket
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllQuizzes: () => {
      dispatch(getAllQuizzes());
    },
    getGroupStudents: id => {
      dispatch(getGroupStudents(id));
    },
    getGroupStatistics: values => {
      dispatch(getGroupStatistics(values));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupStatistics);
