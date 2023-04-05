import React from "react";
import { View, Image } from "react-native";

import styles from "./styles";

export function ImageLogo() {
  return (
    <View>
      <Image
        style={styles.logoImage}
        source={require("../../assets/logo.png")}
      />
    </View>
  );
}
