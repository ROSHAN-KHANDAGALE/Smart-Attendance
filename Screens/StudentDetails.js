import { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  DrawerLayoutAndroid,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StudentDetails = ({ navigation }) => {
  const drawer = useRef(null);
  const [user, setUser] = useState();
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
  useEffect(() => {
    getStoreData();
  }, []);

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.Heading2}>MENU</Text>
      <Button
        title="TeacherDetails"
        onPress={() => {
          navigation.navigate("TeacherDetails");
        }}
      />
      <Button
        title="SignOut"
        onPress={() => {
          AsyncStorage.removeItem("user");
          navigation.navigate("Home");
        }}
      />
    </View>
  );
  //drawer.current.closeDrawer()
  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={250}
      drawerPosition={"left"}
      renderNavigationView={navigationView}
    >
      <View style={styles.mainView}>
        <View style={styles.BottomView}>
          <Text style={styles.Heading}>Student Details</Text>
          <TouchableOpacity style={styles.TouchButton}>
            <Text
              onPress={() => {
                navigation.navigate("QRScanner");
              }}
              style={styles.BtnText}
            >
              Attendance Scanner
            </Text>
          </TouchableOpacity>
          {/* {user && (
            <ScrollView style={styles.DetailView}>
              <Text style={styles.FetchedData}>
                Student Details!! {"\n"}
                ------------------------------------------
              </Text>
              <Text style={styles.FetchedData}>
                Name of Student: {user.user.name}
              </Text>
              <Text style={styles.FetchedData}>
                Roll No.: {user.user.rollNumber}
              </Text>
              <Text style={styles.FetchedData}>E-Mail : {user.user.email}</Text>
              <Text style={styles.FetchedData}>
                Phone Number: +91 {user.user.number}
              </Text>
            </ScrollView>
          )} */}
        </View>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
  },
  mainView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  BottomView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
  Heading: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: 15,
    marginTop: 60,
  },
  Heading2: {
    color: "#000",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: 15,
    marginTop: 60,
  },
  TouchButton: {
    marginTop: 20,
    marginLeft: 70,
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
    fontSize: 18,
  },
  DetailView: {
    marginTop: 100,
  },
  FetchedData: {
    padding: 2,
    marginTop: 5,
    marginLeft: 25,
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default StudentDetails;
