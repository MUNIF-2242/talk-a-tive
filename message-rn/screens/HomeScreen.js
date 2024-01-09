import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Login from "../components/Login";
import Signup from "../components/Signup";

const HomeScreen = ({ navigation }) => {
  const [showLogin, setShowLogin] = useState(true);

  const _handlePress = () => {
    setShowLogin(!showLogin);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabList}>
        <TouchableOpacity
          onPress={_handlePress}
          style={[
            styles.tabButton,
            { backgroundColor: showLogin ? "blue" : "#f1f1f1" }, // Adjust colors as needed
          ]}
        >
          <Text
            style={[
              styles.tabButtonText,
              { color: showLogin ? "white" : "black" },
            ]}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={_handlePress}
          style={[
            styles.tabButton,
            { backgroundColor: showLogin ? "#f1f1f1" : "blue" }, // Adjust colors as needed
          ]}
        >
          <Text
            style={[
              styles.tabButtonText,
              { color: showLogin ? "black" : "white" },
            ]}
          >
            Signup
          </Text>
        </TouchableOpacity>
      </View>
      {showLogin ? (
        <View style={{ width: "100%", paddingHorizontal: 30 }}>
          <Login />
        </View>
      ) : (
        <View style={{ width: "100%", paddingHorizontal: 30 }}>
          <Signup onSignupSuccess={() => setShowLogin(true)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  tabList: {
    flexDirection: "row",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "blue",
    borderBottomWidth: 0,
    marginHorizontal: 30,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
  tabButtonText: {
    fontWeight: "bold",
    color: "white",
  },
});

export default HomeScreen;
