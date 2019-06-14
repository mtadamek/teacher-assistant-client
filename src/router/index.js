import React from "react";
import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
  DrawerItems
} from "react-navigation";
import { Image } from "react-native";
import { Body, Container, Header, Content, Icon } from "native-base";

import SignIn from "../screens/SignIn";
//Teacher
import Profile from "../screens/Profile";

import Groups from "../screens/Groups";
import Students from "../screens/Students";
import SelectQuiz from "../screens/SelectQuiz";
import GroupStatistics from "../screens/GroupStatistics";
import QuizPreview from "../screens/QuizPreview";

import Quizzes from "../screens/Quizzes";
import ManageQuiz from "../screens/ManageQuiz";

//Student
import StudentBoard from "../screens/StudentBoard";
import Quiz from "../screens/Quiz";

const customDrawerContent = props => (
  <Container>
    <Header style={{ height: 230, backgroundColor: "white" }}>
      <Body>
        <Image
          style={{ width: "85%", height: 200, alignSelf: "center" }}
          source={require("../assets/logo.jpg")}
        />
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>
  </Container>
);

const GroupsStack = createStackNavigator(
  {
    Groups: {
      screen: Groups,
      navigationOptions: {
        title: "Grupy",
        header: null
      }
    },
    Students: {
      screen: Students,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.name}`
      })
    },
    SelectQuiz: {
      screen: SelectQuiz,
      navigationOptions: {
        title: "Wybierz quiz"
      }
    },
    GroupStatistics: {
      screen: GroupStatistics,
      navigationOptions: {
        title: "Oceny"
      }
    },
    QuizPreview: {
      screen: QuizPreview,
      navigationOptions: {
        title: "Podgląd quizu"
      }
    }
  },
  {
    initialRouteName: "Groups",
    initialRouteParams: { mainTitle: "Grupy" }
  }
);

const QuizzesStack = createStackNavigator(
  {
    Quizzes: {
      screen: Quizzes,
      navigationOptions: {
        title: "Quziy",
        header: null
      }
    },
    ManageQuiz: {
      screen: ManageQuiz,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params && navigation.state.params.quiz ? "Edytuj quiz" : "Dodaj quiz"
      })
    }
  },
  {
    initialRouteName: "Quizzes",
    initialRouteParams: { mainTitle: "Quizy" }
  }
);

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: "Profil",
        header: null
      }
    }
  },
  {
    initialRouteName: "Profile",
    initialRouteParams: { mainTitle: "Profil" }
  }
);

export const SignedOut = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      header: null
    }
  }
});

export const TeacherSignedIn = createDrawerNavigator(
  {
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        title: "Profil",
        drawerIcon: <Icon name="person" />
      }
    },
    Groups: {
      screen: GroupsStack,
      navigationOptions: {
        title: "Grupy",
        drawerIcon: <Icon name="contacts" />
      }
    },
    Quizzes: {
      screen: QuizzesStack,
      navigationOptions: {
        title: "Quizy",
        drawerIcon: <Icon name="list-box" />
      }
    }
  },
  {
    initialRouteName: "Profile",
    contentComponent: customDrawerContent
  }
);

export const StudentSignedIn = createStackNavigator(
  {
    StudentBoard: {
      screen: StudentBoard,
      navigationOptions: {
        header: null
      }
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "StudentBoard"
  }
);

export const createRootNavigator = (user = false) => {
  return createSwitchNavigator(
    {
      TeacherSignedIn: {
        screen: TeacherSignedIn
      },
      StudentSignedIn: {
        screen: StudentSignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: user
        ? user.role === "teacher"
          ? "TeacherSignedIn"
          : "StudentSignedIn"
        : "SignedOut"
    }
  );
};
