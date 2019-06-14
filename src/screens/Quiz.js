import React, { Component } from "react";
import { View, ScrollView, Image } from "react-native";
import { Field, FieldArray, reduxForm } from "redux-form";
import { connect } from "react-redux";
import QuizForm from "../components/forms/QuizForm";
import { deleteQuiz } from "../actions/student";

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
  Textarea,
  Title
} from "native-base";

class Quiz extends Component {
  handleSubmit = values => {
    const { quiz } = this.props.navigation.state.params;
    const { socket, deleteQuiz } = this.props;
    socket.emit("send-student-quiz", { quiz, values });
    deleteQuiz(quiz);
    this.props.navigation.goBack();
  };

  render() {
    const { quiz } = this.props.navigation.state.params;
    return (
      <QuizForm onSubmit={this.handleSubmit} quiz={quiz} {...this.props} />
    );
  }
}

const mapStateToProps = state => {
  return {
    socket: state.socket
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteQuiz: quiz => {
      dispatch(deleteQuiz(quiz));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
