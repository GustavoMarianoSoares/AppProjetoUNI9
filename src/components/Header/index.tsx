import React from "react";
import { View, TouchableOpacity, Text, Alert } from "react-native";

import auth from "@react-native-firebase/auth";

import styles from "./styles";
import { Entypo } from "@expo/vector-icons";

export function Header() {
  function handleSignOut() {
    Alert.alert("", "Tem certeza que deseja sair?", [
      {
        text: "Cancelar",
      },
      {
        text: "Ok",
        onPress: () => auth().signOut(),
      },
    ]);
  }

  return (
    <View style={styles.headerHome}>
      <Text style={styles.headerText}>
        Olá, {auth().currentUser.displayName} 👋
      </Text>

      <TouchableOpacity onPress={handleSignOut}>
        <Entypo name="log-out" size={35} color="white" marginRight={20} />
      </TouchableOpacity>
    </View>
  );
}
