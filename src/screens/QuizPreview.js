import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { connect } from "react-redux";
import QuizPreviewForm from "../components/forms/QuizPreviewForm";
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
  Picker
} from "native-base";

class QuizPreview extends Component {
  render() {
    const { values, quiz } = this.props.navigation.state.params;
    return <QuizPreviewForm initialValues={values} quiz={quiz} />;
  }
}

export default QuizPreview;
