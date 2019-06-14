import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, Button, Icon, Fab } from "native-base";
import { addQuiz, updateQuiz } from "../actions/quizzes";
import ManageQuizForm from "../components/forms/ManageQuizForm";

class ManageQuiz extends Component {
  handleSubmit = values => {
    console.log("handleSubmit", values);
    if (this.props.navigation.state.params && this.props.navigation.state.params.quiz) {
      const { quiz } = this.props.navigation.state.params;
      this.props.updateQuiz({ ...quiz, ...values });
    } else {
      this.props.addQuiz(values);
    }
    this.props.navigation.goBack();
  };

  render() {
    let initialValues = null;
    if (this.props.navigation.state.params) {
      const { quiz } = this.props.navigation.state.params;
      const { topic, exercises, time } = quiz;
      initialValues = { topic, exercises, time: time.toString() };
    }

    return (
      <ManageQuizForm
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    addQuiz: quiz => {
      dispatch(addQuiz(quiz));
    },
    updateQuiz: quiz => {
      dispatch(updateQuiz(quiz));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageQuiz);
