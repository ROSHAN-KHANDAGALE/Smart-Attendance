// import { useRef } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   DrawerLayoutAndroid,
//   Button,
// } from "react-native";

// const TeacherDetails = ({ navigation }) => {
//   const drawer = useRef(null);

//   const navigationView = () => (
//     <View style={[styles.container, styles.navigationContainer]}>
//       <Text style={styles.Heading2}>MENU</Text>
//       <Button
//         title="SignOut"
//         onPress={() => {
//           AsyncStorage.removeItem("user");
//           navigation.navigate("Home");
//         }}
//       />
//     </View>
//   );
//   //drawer.current.closeDrawer()
//   return (
//     <DrawerLayoutAndroid
//       ref={drawer}
//       drawerWidth={250}
//       drawerPosition={"left"}
//       renderNavigationView={navigationView}
//     >
//       <View style={styles.mainView}>
//         <View style={styles.BottomView}>
//           <Text style={styles.Heading}>Teacher Details</Text>
//           <TouchableOpacity style={styles.TouchButton}>
//             <Text
//               onPress={() => {
//                 navigation.navigate("QRScanner");
//               }}
//               style={styles.BtnText}
//             >
//               GENERATE QRCode
//             </Text>
//           </TouchableOpacity>
//           <ScrollView></ScrollView>
//         </View>
//       </View>
//     </DrawerLayoutAndroid>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//   },
//   navigationContainer: {
//     backgroundColor: "#ecf0f1",
//   },
//   mainView: {
//     flex: 1,
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   BottomView: {
//     width: "100%",
//     height: "100%",
//     backgroundColor: "#000",
//   },
//   Heading: {
//     color: "#fff",
//     fontSize: 30,
//     textAlign: "center",
//     fontWeight: "bold",
//     marginLeft: 15,
//     marginTop: 60,
//   },
//   Heading2: {
//     color: "#000",
//     fontSize: 30,
//     textAlign: "center",
//     fontWeight: "bold",
//     marginLeft: 15,
//     marginTop: 60,
//   },
//   TouchButton: {
//     marginTop: 20,
//     marginLeft: 70,
//     width: "60%",
//     color: "#000",
//     height: 50,
//     backgroundColor: "#fff",
//     borderRadius: 15,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   BtnText: {
//     fontWeight: "bold",
//     fontSize: 18,
//   },
// });

// export default TeacherDetails;
