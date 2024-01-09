import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async () => {
    console.log("signup");
    console.log("Sending data:", { name, password });
    try {
      const { data } = await axios.post("http://192.168.0.101:3000/api/user", {
        userName: name,
        Password: password,
      });
      console.log(data);
    } catch (error) {
      console.error(
        "Error occurred while signing up:",
        error.response?.data || error.message
      );
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
        <Text style={styles.signupButtonText}>Signup</Text>
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

export default Signup;
