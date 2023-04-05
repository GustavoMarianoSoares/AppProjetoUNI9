import React from "react";
import { View, TextInput } from "react-native";

import styles from "./styles";

export function InputTexts({
  placeholder,
  onChangeText,
  secureTextEntry,
  keyboardType,
  value,
  autoCapitalize,
}) {
  return (
    <View>
      <TextInput
        style={styles.inputStyle}
        placeholder={placeholder}
        placeholderTextColor="#616A6B"
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCorrect={false}
        value={value}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
}
