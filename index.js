import { AppRegistry } from "react-native";
import StoreInit from "./src";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => StoreInit);
