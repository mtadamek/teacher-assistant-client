import React, { Component } from "react";
import {
  View,
  Button,
  Text,
  Spinner,
  Form,
  Item,
  Label,
  Input,
  Container,
  Content,
  Header,
  Toast
} from "native-base";
import { Image } from "react-native";
import { connect } from "react-redux";
import {
  postLogin,
  setUserLogin,
  setUserPassword
} from "../actions/authorization";
import GenerateForm from "react-native-form-builder";

const fields = [
  {
    type: "text",
    name: "login",
    required: true,
    icon: "person",
    label: "Użytkownik"
  },
  {
    type: "password",
    name: "password",
    icon: "lock",
    required: true,
    label: "Hasło"
  }
];

class SignIn extends Component {
  handleChangeLogin = login => {
    this.props.setUserLogin(login);
  };

  handleChangePassword = password => {
    this.props.setUserPassword(password);
  };

  handleSubmit = () => {
    const { login, password } = this.formGenerator.getValues();
    const user = {
      login,
      password
    };
    this.props.postLogin(user);
  };

  handleError = error => {
    if (error.status === 401) {
      Toast.show({
        text: "Zła nazwa użytkownika lub hasło!",
        buttonText: "Ok",
        type: "danger",
        duration: 2000,
        position: "top"
      });
    } else {
      Toast.show({
        text: `Error status: ${error.status}`,
        buttonText: "Ok",
        type: "danger",
        duration: 2000,
        position: "top"
      });
    }
  };

  render() {
    const { error } = this.props;
    if (error) {
      this.handleError(error);
    }
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "white"
        }}
      >
        <View style={{ alignSelf: "center" }}>
          <Image
            style={{
              width: 200,
              height: 200
            }}
            source={require("../assets/logo.jpg")}
          />
        </View>
        <View style={{ alignSelf: "center", width: "75%" }}>
          <GenerateForm
            ref={e => {
              this.formGenerator = e;
            }}
            fields={fields}
          />
        </View>
        <View style={{ marginRight: 10, marginLeft: 10, width: "75%", alignSelf: "center" }}>
          <Button block onPress={() => this.handleSubmit()}>
            {this.props.isAuthorization ? (
              <Spinner color="white" />
            ) : (
              <Text>Zaloguj</Text>
            )}
          </Button>
        </View>
      </View>
      // <Container>
      //   <Header />
      //   <Content>
      // <Form>
      //   <Item floatingLabel>
      //     <Label>Username</Label>
      //     <Input />
      //   </Item>
      //   <Item floatingLabel last>
      //     <Label>Password</Label>
      //     <Input />
      //   </Item>
      // </Form>
      //   </Content>
      // </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authorization.user,
    login: state.authorization.login,
    password: state.authorization.password,
    isAuthorization: state.authorization.isAuthorization,
    error: state.authorization.error,
    token: state.authorization.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postLogin: user => {
      dispatch(postLogin(user));
    },
    setUserPassword: password => {
      dispatch(setUserPassword(password));
    },
    setUserLogin: login => {
      dispatch(setUserLogin(login));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
