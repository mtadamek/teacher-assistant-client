import React, { Component } from "react";
import {
  View,
  ScrollView,
  Image,
  ProgressBarAndroid,
  Alert,
  BackHandler
} from "react-native";
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

class QuizComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { timer: undefined };
  }

  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentDidMount() {
    const { quiz } = this.props;
    if (quiz.time) {
      this.setState({ timer: quiz.time * 60 }, () => {
        this.interval = setInterval(
          () => this.setState(prevState => ({ timer: prevState.timer - 2 })),
          2000
        );
      });
    }
  }

  componentWillUpdate(props, state) {
    if (state.timer === 0) {
      clearInterval(this.interval);
      this.props.handleSubmit();
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  handleBackButtonClick = () => {
    Alert.alert(
      "Uwaga!",
      "Czy na pewno chcesz zakończyć quiz?",
      [
        { text: "Nie", style: "cancel" },
        { text: "Tak", onPress: () => this.props.handleSubmit() }
      ],
      { cancelable: false }
    );
    return true;
  };

  renderAnswerCheck = ({ input, text }) => {
    const { value, onChange } = input;
    const _value = value === "" ? false : value;
    return (
      <ListItem
        bordered
        iconLeft
        onPress={() => {
          onChange(!_value);
        }}
      >
        <Left>
          <Icon name="arrow-dropright" />
          <Text>{text}</Text>
        </Left>
        <Right style={{ marginRight: 8 }}>
          <CheckBox
            {...input}
            checked={_value ? true : false}
            onPress={() => onChange(!_value)}
          />
        </Right>
      </ListItem>
    );
  };

  render() {
    const { quiz, handleSubmit } = this.props;
    let progress = null;
    if (this.state.timer && quiz.time) {
      progress = this.state.timer / (quiz.time * 60);
    }

    return (
      <View>
        {progress ? (
          <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            progress={progress}
            color="#2196F3"
            style={{ transform: [{ scaleX: 1.0 }, { scaleY: 3 }], }}
          />
        ) : null}
        <ScrollView
          style={{
            marginRight: 10,
            marginLeft: 10
          }}
        >
          {quiz.exercises.map(({ title, answers }, index) => (
            <Card key={index}>
              <CardItem header bordered>
                <Text>{title}</Text>
              </CardItem>
              {answers.map(({ text }, i) => (
                <Field
                  name={`exercises[${index}].answers[${i}].good`}
                  component={this.renderAnswerCheck}
                  text={text}
                  key={i}
                />
              ))}
            </Card>
          ))}

          <Button
            iconLeft
            primary
            block
            onPress={() =>
              Alert.alert(
                "Uwaga!",
                "Czy na pewno chcesz zakończyć quiz?",
                [
                  { text: "Nie", style: "cancel" },
                  { text: "Tak", onPress: () => handleSubmit() }
                ],
                { cancelable: false }
              )
            }
            style={{ marginTop: 5, marginBottom: 25 }}
          >
            <Text>Wyślij</Text>
            <Icon type="MaterialIcons" name="send" />
          </Button>
        </ScrollView>
      </View>
    );
  }
}

QuizForm = reduxForm({
  form: "quiz"
})(QuizComponent);

export default QuizForm;
