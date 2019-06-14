import React, { Component } from "react";
import { View, ScrollView, Image, ProgressBarAndroid } from "react-native";
import { Field, FieldArray, reduxForm } from "redux-form";

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

class QuizPreviewComponent extends Component {
  renderAnswerCheck = ({ input, text, good }) => {
    const { value } = input;
    const _value = value === "" ? false : value;

    const icon =
      _value && _value === good ? (
        <Icon
          name="check-circle"
          type="MaterialIcons"
          style={{ color: "green", fontSize: 25 }}
        />
      ) : _value && _value !== good ? (
        <Icon name="close-circle" style={{ color: "#d9544e", fontSize: 25 }} />
      ) : null;
    return (
      <ListItem bordered iconLeft>
        <Left>
          <Icon name="arrow-dropright" />
          <Text>{text}</Text>
        </Left>
        <Right style={{ marginRight: 7 }}>{icon}</Right>
      </ListItem>
    );
  };

  render() {
    const { quiz } = this.props;
    return (
      <ScrollView>
        {quiz.exercises.map(({ title, answers }, index) => (
          <Card key={index}>
            <CardItem header bordered>
              <Text>{title}</Text>
            </CardItem>
            {answers.map(({ text, good }, i) => (
              <Field
                name={`exercises[${index}].answers[${i}].good`}
                component={this.renderAnswerCheck}
                text={text}
                key={i}
                good={good}
              />
            ))}
          </Card>
        ))}
      </ScrollView>
    );
  }
}

QuizPreviewForm = reduxForm({
  form: "quizPreview"
})(QuizPreviewComponent);

export default QuizPreviewForm;
