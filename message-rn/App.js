import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "./screens/ChatScreen";
import HomeScreen from "./screens/HomeScreen";
import { StyleSheet } from "react-native";
import ChatProvider from "./Context/ChatProvider";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ChatProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{ title: "Chat" }}
          />
        </Stack.Navigator>
      </ChatProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
