import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation }) => {
  // const getStoreData = async () => {
  //   try {
  //     await AsyncStorage.getItem("userS").then((e) => {
  //       if (e == "" || e == null) {
  //         navigation.navigate("Home");
  //       } else {
  //         navigation.navigate("StudentDetails");
  //       }
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // getStoreData();
  // console.log(userS);

  return (
    <View style={styles.mainView}>
      <TouchableOpacity
        style={styles.nav}
        onPress={() => {
          navigation.navigate("SignIn", { id: "teacher" });
        }}
      >
        <Text style={styles.navText}>Teacher Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.nav}
        onPress={() => {
          navigation.navigate("SignIn", { id: "student" });
        }}
      >
        <Text style={styles.navText}>Student Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginTop: 20,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  nav: {
    //color: '#FFF',
    backgroundColor: "#000",
  },
  navText: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    color: "#FFF",
  },
});
export default Home;
