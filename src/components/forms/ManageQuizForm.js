import React, { Component } from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  Button,
  Text,
  Input,
  Item,
  CheckBox,
  ListItem,
  Body,
  Radio,
  Label,
  Left,
  Right,
  Icon,
  Form,
  Fab,
  List,
  Card,
  CardItem,
  ActionSheet
} from "native-base";

class ManageQuizComponent extends Component {
  renderTopic = props => {
    const { label, input, keyboardType } = props;
    return (
      <Input
        {...input}
        style={{ borderBottomWidth: 1, borderColor: "#cccccc" }}
        placeholder={label}
        keyboardType={keyboardType}
      />
    );
  };

  renderTime = props => {
    const { label, input, keyboardType } = props;
    return (
      <Input
        {...input}
        style={{ borderBottomWidth: 1, borderColor: "#cccccc" }}
        placeholder={label}
        keyboardType={keyboardType}
      />
    );
  };

  renderExercises = ({ fields }) => {
    return (
      <View>
        {fields.map((exercise, index) => {
          return (
            <Card key={index}>
              <ListItem>
                <Body>
                  <Field
                    name={`${exercise}.title`}
                    component={this.renderExerciseTitle}
                    label={`Zadanie ${index + 1}`}
                  />
                </Body>
                <Right>
                  <Button
                    bordered
                    danger
                    icon
                    onPress={() => fields.remove(index)}
                  >
                    <Icon name="trash" />
                  </Button>
                </Right>
              </ListItem>

              <FieldArray
                name={`${exercise}.answers`}
                component={this.renderAnswers}
              />
            </Card>
          );
        })}
        <Button
          style={{ marginTop: 5 }}
          success
          block
          iconLeft
          onPress={() => fields.push({})}
        >
          <Icon name="add-circle" />
          <Text>Dodaj Zadanie</Text>
        </Button>
      </View>
    );
  };

  renderExerciseTitle = ({ input, label }) => {
    const { onChange } = input;
    return (
      <Input
        {...input}
        onChangeText={onChange}
        placeholder={label}
        style={{ borderBottomWidth: 1, borderColor: "#cccccc" }}
      />
    );
  };

  renderAnswers = ({ fields }) => {
    return (
      <View>
        {fields.map((answer, index) => (
          <Field
            name={`${answer}`}
            component={this.renderAnswer}
            label={`Odp ${index + 1}`}
            key={index}
            deleteBtn={
              <Icon
                style={{ color: "#d9544e", fontSize: 25 }}
                name="remove-circle"
                type="MaterialIcons"
                onPress={() => fields.remove(index)}
              />
            }
          />
        ))}
        <Button success bordered full iconLeft onPress={() => fields.push({})}>
          <Icon name="add-circle" />
          <Text>Dodaj odpowiedź</Text>
        </Button>
      </View>
    );
  };

  renderAnswer = ({ input, label, deleteBtn }) => {
    const { value, onChange } = input;
    const _value = value === "" ? {} : value;
    return (
      <ListItem
        icon
        style={{
          marginTop: 15,
          marginBottom: 15
        }}
      >
        <Left>
          {_value.good ? (
            <Button
              primary
              icon
              onPress={() => onChange({ ..._value, good: !_value.good })}
            >
              <Icon name="checkmark" />
            </Button>
          ) : (
            <Button
              bordered
              dark
              icon
              onPress={() => onChange({ ..._value, good: !_value.good })}
            >
              <Icon name="checkmark" />
            </Button>
          )}
        </Left>
        <Body>
          <Input
            onChangeText={text => onChange({ ..._value, text })}
            placeholder={label}
            value={_value.text ? _value.text : ""}
          />
        </Body>
        <Right>{deleteBtn}</Right>
      </ListItem>
    );
  };

  renderAnswerCheck = ({ input }) => {
    const { value, onChange } = input;
    const _value = value === "" ? false : value;
    return (
      <Right>
        <CheckBox
          {...input}
          checked={_value ? true : false}
          onPress={() => onChange(!_value)}
          style={{ marginRight: 15, marginTop: 10 }}
        />
      </Right>
    );
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <ScrollView
        style={{
          marginRight: 10,
          marginLeft: 10
        }}
      >
        <Card>
          <CardItem>
            <Text>Temat: </Text>
            <Field
              keyboardType="default"
              label="-"
              name="topic"
              component={this.renderTopic}
            />
          </CardItem>
          <CardItem>
            <Text>Czas(min): </Text>
            <Field
              keyboardType="numeric"
              label="-"
              name="time"
              component={this.renderTime}
            />
          </CardItem>
        </Card>

        <FieldArray name="exercises" component={this.renderExercises} />
        <Button
          iconLeft
          primary
          block
          onPress={handleSubmit}
          style={{ marginTop: 5, marginBottom: 10 }}
        >
          <Icon type="MaterialIcons" name="save" />
          <Text>Zapisz</Text>
        </Button>
      </ScrollView>
    );
  }
}

ManageQuizForm = reduxForm({
  form: "manageQuiz"
})(ManageQuizComponent);

export default ManageQuizForm;
