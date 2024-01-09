import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Login from "../components/Login";
import Signup from "../components/Signup";

const HomeScreen = () => {
  const [showLogin, setShowLogin] = useState(true);

  const _handlePress = () => {
    setShowLogin(!showLogin);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabList}>
        <TouchableOpacity
          onPress={_handlePress}
          style={{ color: showLogin ? "grey" : "black" }}
        >
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={_handlePress}
          style={{ color: showLogin ? "black" : "grey" }}
        >
          <Text>Signup</Text>
        </TouchableOpacity>
      </View>
      {showLogin ? (
        <View>
          <Login />
        </View>
      ) : (
        <View>
          <Signup />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabList: {
    flexDirection: "row",
    gap: 20,

    padding: 20,
  },
});

export default HomeScreen;
