import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
//import { signIn } from "next-auth/react";

const Login = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async () => {
    try {
      const result = await signIn("credentials", {
        name,
        password,
        redirect: false,
        //callbackUrl: "/conversations", // Replace with your desired callback URL
      });

      if (result?.ok) {
        // Handle successful login (e.g., navigate to another screen)
        console.log("Login successful:", result);
        // Navigate to another screen or perform other actions
      } else {
        // Handle login error (e.g., display an error message)
        console.log("Login error:", result?.error);
        // You can display an error message to the user if needed
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error logging in:", error);
      // Display an error message to the user if needed
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.signupButton} onPress={submitHandler}>
        <Text style={styles.signupButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  uploadButton: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  uploadButtonText: {
    color: "#fff",
  },
  signupButton: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  signupButtonText: {
    color: "#fff",
  },
});

export default Login;
