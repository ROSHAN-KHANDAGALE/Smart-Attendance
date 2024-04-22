import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = ({ route, navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // useEffect(() => {
  //   async function tempgetStorage() {
  //     await getStoreData();
  //   }
  //   tempgetStorage();
  //   return () => {};
  // }, []);

  const { id } = route.params;
  function camelCase(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index == 0 ? word.toUpperCase() : word.toLowerCase();
      })
      .replace(/\s+/g, "");
  }

  const storeData = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  async function handleSubmit() {
    console.log(email, password);
    try {
      await fetch(`http://192.168.43.231:5000/api/v1/auth/${id}Login`, {
        method: "POST",
        headers: {
          //Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          storeData(data);
          if (data.user.position == "Student") {
            navigation.navigate("StudentDetails", { id: "student" });
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.TopView}>
        <Image
          style={styles.LogoStyle}
          source={require("../assets/logo.png")}
        />
      </View>
      <ScrollView style={styles.BottomView}>
        <Text style={styles.Heading}>Welcome{"\n"} Back</Text>
        <View style={styles.CardFormView}>
          <TextInput
            placeholder="Email address *"
            placeholderTextColor={"#fff"}
            autoCapitalize={false}
            style={styles.TextInputField}
            onChangeText={(e) => setEmail(e)}
          />
          <TextInput
            placeholder="Password *"
            placeholderTextColor={"#fff"}
            secureTextEntry={true}
            style={styles.TextInputField}
            onChangeText={(e) => setPassword(e)}
          />
          <TouchableOpacity style={styles.SigninButton}>
            <Text onPress={handleSubmit} style={styles.BtnText}>
              {camelCase(id)} SignIn
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  TopView: {
    width: "100%",
    height: "40%",
    backgroundColor: "#FFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  BottomView: {
    width: "100%",
    height: "60%",
    backgroundColor: "#000",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  LogoStyle: {
    width: "50%",
    resizeMode: "contain",
  },
  Heading: {
    color: "#CCCCFF",
    fontSize: 35,
    fontWeight: "bold",
    marginLeft: 15,
    marginTop: 60,
  },
  TextInputField: {
    padding: 10,
    marginTop: 20,
    color: "#fff",
    borderColor: "#9EE",
    width: "90%",
    borderWidth: 2,
    height: 50,
    borderRadius: 12,
  },
  CardFormView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  SigninButton: {
    marginTop: 20,
    width: "60%",
    color: "#000",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  BtnText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  Signup: {
    color: "#CCCCFF",
  },
  SignupBtn: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

export default SignIn;
