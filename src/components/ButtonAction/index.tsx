import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

import styles from "./styles";

export function ButtonAction({ title, onPress }) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.touchableStyle}>
        <Text style={styles.textStyle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
