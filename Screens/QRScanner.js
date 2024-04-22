import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QRScanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [user, setUser] = useState();
  const [message, setMessage] = useState();
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

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    console.log(data);
    try {
      await fetch(`http://192.168.43.231:5000/api/v1/get/attendance/${data}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          classID: user.user.classID,
          departmentID: user.user.departmentID,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setMessage("Attendance Successfully");
        });
    } catch (error) {
      console.log(error);
      setMessage("Already Attended");
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && <Text style={styles.TextMsg}>{message}</Text>}
      {scanned && (
        <Button
          title={"MENU"}
          onPress={() => {
            navigation.navigate("StudentDetails");
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  TextMsg: {
    backgroundColor: "#85b775",
    fontSize: 25,
    textAlign: "center",
    padding: 5,
    width: "70%",
    alignSelf: "center",
    fontWeight: "bold",
  },
});

export default QRScanner;
