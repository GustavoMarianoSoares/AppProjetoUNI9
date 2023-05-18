import { Text, View } from "react-native";
import React from "react";

import styles from "./styles"

export function We() {
  return (
    <View>
      <View style={styles.names}>
        <Text style={styles.namesText}>Gustavo Mariano Soares</Text>
        <Text style={styles.namesText}>Breno Marcos da Silva Vela</Text>
      </View>

      <View style={styles.details}>
        <Text>Empresa criada em 2023 com o intuito de ajudar donos/CEO de lojas de Help desk onde ajuda com a organização de componentes para serem arrumados, limpos, melhorados, montados e etc...
        </Text>
      </View>
    </View>
  );
}
