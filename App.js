import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StudentDetails from "./Screens/StudentDetails";
import SignIn from "./Screens/SignIn";
import Home from "./Screens/Home";
import QRScanner from "./Screens/QRScanner";
// import TeacherDetails from "./Screens/TeacherDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

function App({ navigation }) {
  const [user, setUser] = React.useState();
  const getStoreData = async () => {
    try {
      await AsyncStorage.getItem("user")
        .then((e) => JSON.parse(e))
        .then((x) => {
          setUser(x);
        });
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    getStoreData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />

        {/* <Stack.Screen name="SignIn" component={SignIn} /> */}
        {/* <Stack.Screen name="StudentDetails" component={StudentDetails} /> */}

        {/* <Stack.Screen name="QRScanner" component={QRScanner} /> */}
        {/* <Stack.Screen name="TeacherDetails" component={TeacherDetails} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
  //
}

export default App;
